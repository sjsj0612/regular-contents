"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import downloadjs from "downloadjs";
import domtoimage from 'dom-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useChartDataState } from '@/recoil/chartData';
import Bar from '@/components/chart/Bar';
import axios from 'axios';

const Container = styled.div`
  display: 'flex';
`
const ImageContainer = styled.div`
  width: max-content;
  inline-size: max-content;
  height: max-content;
`

const insightData = {
  "basicDisplayName": "입력테스트인사이트세진",
  "insightUnitType": "BASIC",
  "insightName": "sample13",
  "cardImageSource": "s3://",
  "detailCardTopImageSource": "s3://",
  "insightType": "INTERACTIVE",
  "contents": "CONTENTS LENGTH",
  "hashTags": "주거생활,테스트",
  "userId": 1111594,
  "enabled": true,
  "creationDateTime": "2023-05-04T02:50:05.342",
  "modificationDateTime": "2023-05-09T02:50:05.342"
}
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExNTk0IiwidXNlcklkIjoxMCwidXNlckdyb3VwIjoiQURNSU4iLCJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIl0sImlhdCI6MTY4MzY5MzY4NiwiZXhwIjoxNjgzNjk3Mjg2fQ.r1cUr3GXOQqOePe1TGkH72D7QgcMIXobACXZIShf4ho'
    
const Page = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [chartDataState, ] = useChartDataState();
    console.log('victory state', chartDataState);
    const [file, setFile] = useState<any>();
  
    useEffect(() => {
      // 들어가자마자 다운된다네! ㅎㅎ
      // handleClick();
    }, [])

    useEffect(() => {
      console.log('file', file)
    }, [file])
  
    const handleClick = useCallback(async () => {
      if (ref.current) {
        // downloadjs(await toJpeg(ref.current), "test1.jpg");
        // downloadjs(await toSvg(ref.current), "test.svg");
        // downloadjs(await domtoimage.toBlob(ref.current), "test.png");
        const image = await domtoimage.toBlob(ref.current)
        const myFile = new File([image], 'image.jpeg', {
          type: image.type,
      });
        setFile(myFile)
        // console.log('image', image);
        return myFile
      }
    }, []);


    const onSubmitImage = async (ref: any) => {
      const formData = new FormData()
      const image = await domtoimage.toBlob(ref.current);
      const myFile = new File([image], 'image.jpeg', {
          type: image.type,
      });
      formData.append("fileCategory", "INSIGHT_ATTACHED_FILE")
      formData.append("targetFile", myFile)

      console.log('formdata', formData)
      
      return await axios({
        method: "POST",
        url: `https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files`,
        headers: {
          "Content-Type": "application/json", // Content-Type을 반드시 multipart/form-data 이렇게 하여야 한다.
          "Authorization": `Bearer ${token}`,        
        },
        data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
      }).then((res) => {console.log(res)})
    }

    const onSubmitFile = async () => {
      const formData = new FormData()
      formData.append("targetFile", file)
      formData.append("fileCategory", "INSIGHT_REPORT")
      console.log('formdata', formData)
      console.log('get', formData.getAll("fileCategory"));
      console.log('get', formData.getAll("targetFile"));


      return await axios({
        method: "POST",
        url: `https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files`,
        headers: {
          "Content-Type": "application/json", // Content-Type을 반드시 multipart/form-data 이렇게 하여야 한다.
          "Authorization": `Bearer ${token}`,        
        },
        data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
      }).then((res) => {console.log(res)})
    }


    const onSubmitInsight = async (data:any) => {
      await axios({
        method: "POST",
        url: "https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/insights",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data
      }).then((res) => console.log('res', res))
      .catch((err) => console.log('err', err))
    }

    const onSubmitAPI = async () => {
      console.log('submit API')
      return await axios({
        method: "GET",
        url: "http://localhost:3000/api",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => console.log('res', res))
      .catch((err) => console.log('err', err))
    }

    const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {
      console.log('e', e)
      if (
        null !== e.currentTarget &&
        null !== e.currentTarget.files &&
        null !== e.currentTarget.files.length > 0
      ) {
        // const tmpFile = file;
        // tmpFile[type] = e.currentTarget.files[0];
        const file = e.currentTarget.files[0]
        setFile(file);
      }
    };
  
    return (
      <Container>
          <ImageContainer ref={ref}>
              <Bar/>
          </ImageContainer>
          <button onClick={() => handleClick()}>Click</button>
          <button onClick={() => onSubmitImage(ref)}>Image Submit</button>
          <button onClick={() => onSubmitFile()}>File Submit</button>
          <button onClick={() => onSubmitInsight(insightData)}>Insight Submit</button>
          <button onClick={() => onSubmitAPI()}>Test</button>
          {/* <div>{file}</div> */}
          <input type="file" width={100} height={20} onChange={(e) => handleFileInput(e)} />
      </Container>
    );
}

export default Page;