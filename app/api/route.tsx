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
    
    // setChartDataState(res);

export async function POST(request: Request) {
    // recoil state에 저장하는 hook
    const setChartDataState = useSetRecoilState(chartDataState);
    const res = await request.json();
    console.log('res', res);

    // body를 state에 저장
    setChartDataState(res);
    
    return NextResponse.json({ res });
}

