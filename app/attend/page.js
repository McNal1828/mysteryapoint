'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const [data, setdata] = useState([]);
  const [table, settable] = useState([]);

  useEffect(() => {
    fetch(`/api/attend`, { cache: 'no-store' })
      .then((data) => data.json())
      .then((data) => {
        setdata(data.attend);
      });
    return () => {
      setdata([]);
    };
  }, []);
  useEffect(() => {
    const result = [];
    const formattedDates = data.map((ddd) => {
      const date = new Date(ddd.date); // 문자열을 Date 객체로 변환
      const month = date.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1
      const day = date.getUTCDate(); // 일 가져오기
      let type;
      switch (ddd.type) {
        case 'prac':
          type = '연습';
          break;
        case 'league':
          type = '리그';
          break;
        case 'pracmatch':
          type = '연습시합';
          break;
        case 'tournament':
          type = '대회';
          break;
        default:
          break;
      }
      return [`${month}/${day}`, type]; // 'M/D' 형식으로 변환
    });
    result.push(['이름', ...formattedDates]);

    const playerBacknumberList = [
      '김건희',
      '김도영',
      '김선홍',
      '김정수',
      '남지우',
      '박재현',
      '송훈석',
      '신동원',
      '신동한',
      '양정환',
      '원효석',
      '윤찬혁',
      '이강훈',
      '이동환',
      '이성재',
      '이종진',
      '이창현',
      '정은택',
      '조원주',
      '조재원',
      '조주현',
      '조현우',
      '최수진',
      '최웅수',
      '홍성운',
      '홍승표',
    ];
    for (let backnumber of playerBacknumberList) {
      let tempresult = [];
      tempresult.push(backnumber);
      data.forEach((ddd) => {
        const isattend = ddd.members.some((player) => player.name.includes(backnumber));
        if (isattend) {
          tempresult.push('참석');
        } else {
          tempresult.push('');
        }
      });
      result.push(tempresult);
    }
    settable(result);
    return () => {
      settable([]);
    };
  }, [data]);

  return (
    <>
      <div className='overflow-auto'>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope='col'>{table?.[0]?.[0]}</th>
              {table?.[0]?.slice(1)?.map((Content, index) => (
                <th scope='col' key={index}>
                  {Content[0]}
                  <sub>{Content[1]}</sub>
                </th>
              ))}
              {/* <th scope='col'>
                1/1<sub>리그</sub>
              </th>
              <th scope='col'>
                1/2<sub>연습</sub>
              </th>
              <th scope='col'>
                1/3<sub>대회</sub>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {table?.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th scope='row'>{row[0]}</th>
                {row.slice(1).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            <tr>
              <th>평균</th>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>+30</td>
              <td>120</td>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </>
  );
}
