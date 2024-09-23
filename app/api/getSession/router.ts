import { JWTInterface } from "@/app/types";
import { getSession } from "@/lib";

export async function POST(req: Request) {
    const session: JWTInterface = await getSession();

    return session.user;
}
