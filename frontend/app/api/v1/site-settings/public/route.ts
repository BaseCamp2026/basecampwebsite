import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    data: {
      siteName: 'Basecamp Community Platform',
      tagline: 'An open community bringing people together to learn, connect, collaborate, and build.',
      isStudentExclusive: false,
      audienceScope: 'Students, working professionals, founders, creators, educators, and hobbyists',
      timezone: 'Asia/Kolkata',
      brandPalette: {
        primaryBackground: '#080808',
        surface: '#151515',
        accentRed: '#F32936',
        textWhite: '#F5F3EF',
        textMuted: '#A7A5A2',
        border: '#303030',
      },
      contacts: {
        email: 'organizers@basecamp.community',
        hubLocation: '108 Indiranagar 100ft Road, Bengaluru, Karnataka 560038',
      },
      features: {
        registrationWaitlists: true,
        digitalQRTickets: true,
        deskCheckIn: true,
      },
    },
  });
}

