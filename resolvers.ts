import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    events: async () => {
      const events = await prisma.event.findMany();

      const eventsWithAttendees = await Promise.all(
        events.map(async (event) => {
          const userEvents = await prisma.userEvent.findMany({
            where: { eventId: event.id },
            include: { user: true },
          });

          const attendees = userEvents.map((ue) => ue.user);
          return { ...event, attendees };
        })
      );

      return eventsWithAttendees;
    },

    me: async (_: any, __: any, context: any) => {
      const userId = context.userId;
      if (!userId) return null;

      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          events: {
            include: {
              event: true,
            },
          },
        },
      });
    },
  },

  Mutation: {
    createUser: async (_: any, args: any) => {
      const { name, email } = args;

      try {
        return await prisma.user.create({
          data: { name, email },
        });
      } catch (error: any) {
        if (
          error.code === 'P2002' &&
          error.meta?.target?.includes('email')
        ) {
          throw new Error('A user with this email already exists.');
        }
        throw error;
      }
    },

    createEvent: async (_: any, args: any, context: any) => {
      console.log("🧪 Header userId from context:", context.userId); 
      const { name, location, startTime } = args;
      const userId = context.userId;

      if (!userId) {
        throw new Error('User not authenticated.');
      }

      // ✅ Remove userId from event.create
      const newEvent = await prisma.event.create({
        data: {
          name,
          location,
          startTime: new Date(startTime),
        },
      });

      // ✅ Link user and event via UserEvent table
      await prisma.userEvent.create({
        data: {
          userId,
          eventId: newEvent.id,
        },
      });

      const userEvents = await prisma.userEvent.findMany({
        where: { eventId: newEvent.id },
        include: { user: true },
      });

      const attendees = userEvents.map((ue) => ue.user);

      if (context.io) {
        context.io.emit('eventCreated', { ...newEvent, attendees });
      }

      return { ...newEvent, attendees };
    },

    joinEvent: async (_: any, args: any, context: any) => {
      const { eventId, userId } = args;

      // ✅ Check if already joined
      const alreadyJoined = await prisma.userEvent.findFirst({
        where: { eventId, userId },
      });

      if (alreadyJoined) {
        throw new Error('User has already joined this event.');
      }

      await prisma.userEvent.create({
        data: {
          eventId,
          userId,
        },
      });

      const userEvents = await prisma.userEvent.findMany({
        where: { eventId },
        include: { user: true },
      });

      const attendees = userEvents.map((ue) => ue.user);

      if (context.io) {
        context.io.emit('attendeeUpdate', {
          eventId,
          attendees,
        });
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
      });

      return { ...event, attendees };
    },
  },
};
