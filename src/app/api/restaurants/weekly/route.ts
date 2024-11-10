import { getWeeklyRestaurants } from '@/remotes/restaurants';

export async function GET() {
  const data = await getWeeklyRestaurants();
  return new Response(JSON.stringify(data), { status: 200 });
}
