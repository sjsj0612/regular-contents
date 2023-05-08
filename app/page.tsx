// 현재 컴포넌트 작성 시 서버 컴포넌트가 default 이기 때문에 "use client" 추가해서 client components 라는걸 알려주어야 합니다.
"use client"; 
import { useState } from 'react';
import styled from "styled-components";
const Container = styled.div`
  padding: 0 2rem;
`;


export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('./newPage/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      setAnswer(data.result);
      setQuestion('');
    } catch (error:any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type='submit'>질문하기</button>
      </form>
      <div>{answer}</div>
    </>
  );
}