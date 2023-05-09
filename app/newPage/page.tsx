"use client";
import React, { useCallback, useEffect, useRef } from 'react';
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


const Page = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [chartDataState, ] = useChartDataState();
    console.log('victory state', chartDataState);

    useEffect(() => {
      // 들어가자마자 다운된다네! ㅎㅎ
      // handleClick();
    }, [])
  
    const handleClick = useCallback(async () => {
      if (ref.current) {
        downloadjs(await toJpeg(ref.current), "test1.jpg");
        // downloadjs(await toSvg(ref.current), "test.svg");
      }
    }, []);

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTEyMDA3IiwidXNlcklkIjoxLCJ1c2VyR3JvdXAiOiJBRE1JTiIsInJvbGVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwiaWF0IjoxNjgzNjIyODAzLCJleHAiOjE2ODM2MjY0MDN9.Z03jVL614Aas3ZmLWSkB4EF61AOsVVk_Pd0RdSxcVMI'
 
    const onSubmitImage = async (ref: any) => {
      const formData = new FormData()
      const image = await domtoimage.toBlob(ref.current);
      formData.append("fileCategory", "INSIGHT_ATTACHED_FILE")
      formData.append("targetFile", image)

      console.log('formdata', formData)

      return axios
          .post('https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files', formData, {
            headers: {
              'Content-Type': 'application/json', //multipart/form-data
              "Authorization": `Bearer ${token}`,
            },
          })
          .then((res) => {console.log(res);});

    //   await axios({
    //     method: "POST",
    //     url: `https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files`,
    //     headers: {
    //       "Content-Type": "*/*", // Content-Type을 반드시 multipart/form-data 이렇게 하여야 한다.
    //       "Authorization": `Bearer ${token}`,        
    //     },
    //     data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
    // })

    }
    const insightData = {
      "basicDisplayName": "입력테스트인사이트",
      "insightUnitType": "BASIC",
      "insightName": "sample12",
      "cardImageSource": "s3://",
      "detailCardTopImageSource": "s3://",
      "insightType": "INTERACTIVE",
      "contents": "CONTENTS LENGTH",
      "hashTags": "지하철,테스트",
      "userId": 5,
      "enabled": true,
      "creationDateTime": "2021-03-04T02:50:05.342",
      "modificationDateTime": "2021-07-13T02:50:05.342"
    }
    const onSubmitInsight = async () => {
      await axios({
        method: "POST",
        url: "https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/insights",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: insightData
      })
    }
    return (
      <Container>
          <ImageContainer ref={ref}>
              <Bar/>
          </ImageContainer>
          <button onClick={() => handleClick()}>Click</button>
          <button onClick={() => onSubmitImage(ref)}>Image Submit</button>
          <button onClick={() => onSubmitInsight()}>Image Submit</button>
      </Container>
    );
}

export default Page;