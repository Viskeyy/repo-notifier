import { ACCEPT_EVENT_TYPES } from '@/constants/constant';
import { handleEvent } from '@/helper/handle_event';
import { EventTypes } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return new NextResponse('ERROR: Method not allowed', { status: 405 });
    }

    if (req.headers.get('content-type') !== 'application/json') {
        return new NextResponse('ERROR: Invalid content type', { status: 415 });
    }

    const eventId = req.headers.get('x-github-delivery');
    const eventType = req.headers.get('x-github-event');

    if (!eventId || !eventType) {
        return new NextResponse('ERROR: Missing event id or type', { status: 400 });
    }

    if (!ACCEPT_EVENT_TYPES.includes(eventType)) {
        return new NextResponse('ERROR: Useless event type', { status: 400 });
    }

    const raw: EventTypes = JSON.parse(await req.text());
    const eventAction = 'action' in raw ? raw.action : '';
    const eventSender = raw?.sender?.login;
    const orgName = raw?.organization?.login;
    const repoName = raw?.repository?.full_name;

    if (eventSender.endsWith('[bot]')) {
        return new Response('ERROR: Bot event', { status: 400 });
    }

    const { eventTitle, ts } = handleEvent(eventType, raw);

    return new NextResponse('OK', { status: 200 });
}
