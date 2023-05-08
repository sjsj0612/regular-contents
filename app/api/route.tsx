import { NextResponse } from "next/server";
import { useSetRecoilState } from "recoil";
import { chartDataState } from "@/recoil/chartData";

export async function GET() {
    const data = { 
        pokemon: {
            name: '꼬부기'
        }
    }
    return NextResponse.json({ data });
}

export async function POST(request: Request) {
    // const setChartDataState = useSetRecoilState(chartDataState);
    const res = await request.json();
    console.log('res', res)
    // setChartDataState(res);
    return NextResponse.json({ res });
}

