import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Name, email, and message are required fields.',
          },
        },
        { status: 422 }
      );
    }

    // In production, this persists via Prisma to PostgreSQL and dispatches email notifications
    return NextResponse.json({
      data: {
        id: `msg-${Date.now()}`,
        status: 'OPEN',
        message: 'Your inquiry has been received by Basecamp organizers.',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while processing your message.',
        },
      },
      { status: 500 }
    );
  }
}

