import {NextRequest,NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {

  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(videos, {status: 200})
  } catch (error: any) {
    return NextResponse.json(
      {error: "Error ocurred while fetching videos" || error.message},
      {status: 500}
    )
    
  } finally {
    await prisma.$disconnect()
  }
}