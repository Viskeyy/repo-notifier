export const dynamic = 'force-dynamic';
export const revalidate = 0;

// export async function GET(request: Request) {
//     try {
//         const res = await sql`
// SELECT
//     event_action,
//     event_sender,
//     event_title,
//     event_type,
//     org_name,
//     repo_name,
//     ts AT TIME ZONE 'UTC +8'
// FROM
//     repo_logs
// WHERE
//     ts >= (NOW() - INTERVAL '1 day') AT TIME ZONE 'UTC +0'
// ORDER BY
//     ts ASC
// `;
//         return new Response(JSON.stringify(res), {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-store, max-age=0',
//             },
//         });
//     } catch (error) {
//         return new Response(JSON.stringify(error), { status: 500 });
//     }
// }
