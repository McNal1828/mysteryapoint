'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const [data, setdata] = useState([]);
  const [total, settotal] = useState([]);
  const [recent, setrecent] = useState({});
  const [table, settable] = useState([]);
  const [cdata, setcdata] = useState({});
  const [ismodalopen, setismodalopen] = useState(false);
  const [attend, setattend] = useState([]);

  useEffect(() => {
    fetch(`/api/attend`, { cache: 'no-store' })
      .then((data) => data.json())
      .then((data) => {
        setattend(data.attend);
      });
    fetch(`/api/point`, { cache: 'no-store' })
      .then((data) => data.json())
      .then((data) => {
        setdata(data.data);
      });
    return () => {
      setdata([]);
      setattend([]);
    };
  }, []);
  useEffect(() => {
    const result = {};

    data.forEach(({ backnumber, attack, normal, defense, name }) => {
      if (!result[backnumber]) {
        result[backnumber] = { name, attack: 0, normal: 0, defense: 0 };
      }
      result[backnumber].attack += attack.reduce((sum, item) => sum + (item.point || 0), 0);
      result[backnumber].normal += normal.reduce((sum, item) => sum + (item.point || 0), 0);
      result[backnumber].defense += defense.reduce((sum, item) => sum + (item.point || 0), 0);
      result[backnumber].total = result[backnumber].attack + result[backnumber].normal + result[backnumber].defense;
    });
    settotal(
      Object.entries(result)
        .sort(([, a], [, b]) => b.total - a.total)
        .slice(0, 5)
    );
    return () => {
      settotal([]);
    };
  }, [data]);
  useEffect(() => {
    const result = {};
    const recentdate = [...new Set(data.filter((item) => item.type !== 'prac').map((item) => item.date))];
    recentdate.sort((a, b) => new Date(b) - new Date(a)).slice(0, 5);
    recentdate.forEach((date) => {
      if (!result[date]) {
        result[date] = {};
      }
      data
        .filter((item) => item.date === date)
        .forEach(({ backnumber, attack, normal, defense, name }) => {
          if (!result[date][backnumber]) {
            result[date][backnumber] = { name, attack: 0, normal: 0, defense: 0 };
          }
          result[date][backnumber].attack += attack.reduce((sum, item) => sum + (item.point || 0), 0);
          result[date][backnumber].normal += normal.reduce((sum, item) => sum + (item.point || 0), 0);
          result[date][backnumber].defense += defense.reduce((sum, item) => sum + (item.point || 0), 0);
          result[date][backnumber].total = result[date][backnumber].attack + result[date][backnumber].normal + result[date][backnumber].defense;
        });
    });
    setrecent(result);
    return () => {
      setrecent({});
    };
  }, [data]);
  useEffect(() => {
    const result = [];
    const formattedDates = attend
      .filter((item) => item.type !== 'prac')
      .map((ddd) => {
        const date = new Date(ddd.date); // 문자열을 Date 객체로 변환
        const month = date.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = date.getUTCDate(); // 일 가져오기
        let type;
        switch (ddd.type) {
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
    result.push(['이름', '총점수', ...formattedDates]);

    // const result = [];
    const recentdate = [...new Set(data.filter((item) => item.type !== 'prac').map((item) => item.date))].sort();
    // const formattedDates = recentdate.map((dateStr) => {
    //   const date = new Date(dateStr); // 문자열을 Date 객체로 변환
    //   const month = date.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1
    //   const day = date.getUTCDate(); // 일 가져오기
    //   return `${month}/${day}`; // 'M/D' 형식으로 변환
    // });
    // result.push(['이름', '총점수', ...formattedDates]);

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
    const avg = ['평균'];
    for (let backnumber of playerBacknumberList) {
      const playerDatas = data.filter((item) => item.name === backnumber);
      let tempresult = [];
      let total = 0;
      for (let playerdata of playerDatas) {
        playerdata.total = 0;
        playerdata.total += playerdata.attack.reduce((sum, item) => sum + (item.point || 0), 0);
        playerdata.total += playerdata.defense.reduce((sum, item) => sum + (item.point || 0), 0);
        playerdata.total += playerdata.normal.reduce((sum, item) => sum + (item.point || 0), 0);
        total += playerdata.total;
      }
      tempresult.push(backnumber);
      tempresult.push(total);
      for (let rdate of recentdate) {
        tempresult.push(playerDatas.filter((item) => item.date === rdate)[0] || {});
      }
      result.push(tempresult);
    }
    settable(result);
    return () => {
      settable([]);
    };
  }, [data, attend]);

  const isSSR = typeof window === 'undefined';
  const htmlTag = !isSSR && document.querySelector('html');
  const modalAnimationDuration = 400;

  /**
   *
   * @param {Event} event
   */
  const modalopen = (event) => {
    event.preventDefault();
    if (htmlTag) {
      setismodalopen(true);
      htmlTag.classList.add('modal-is-open', 'modal-is-opening');
      setTimeout(() => {
        htmlTag.classList.remove('modal-is-opening');
      }, modalAnimationDuration);
    }
  };
  /**
   *
   * @param {Event} event
   */
  const modalclose = (event) => {
    event.preventDefault();
    if (htmlTag) {
      htmlTag.classList.add('modal-is-closing');
      setTimeout(() => {
        setismodalopen(false);
        htmlTag.classList.remove('modal-is-open', 'modal-is-closing');
      }, modalAnimationDuration);
    }
  };

  return (
    <>
      <div className={`grid ${styles.maingrid}`}>
        <article>
          <header>
            <h3>2025 총 점수 top 5</h3>
          </header>

          {total.map(([key, value]) => (
            <h4 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={key}>
              <span>
                No.{key} {value.name}
              </span>
              <kbd>{value.total}점</kbd>
            </h4>
          ))}
          {/* <h5 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>No.3 송훈석</span>
            <kbd>100점</kbd>
          </h5>
          <h6 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>No.3 송훈석</span>
            <kbd>100점</kbd>
          </h6>
          <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>No.3 송훈석</span>
            <kbd>100점</kbd>
          </p>
          <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>No.3 송훈석</span>
            <kbd>100점</kbd>
          </p> */}
        </article>
        <article className='overflow-auto' style={{ display: 'flex', gap: '40px' }}>
          {Object.entries(recent).map(([key, value]) => {
            const date = new Date(key);
            const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
            const day = date.getDate();
            return (
              <article style={{ minWidth: '400px' }} key={key}>
                <header>
                  <h4>
                    {month}/{day}경기 top 5
                  </h4>
                </header>
                {Object.entries(value)
                  .sort(([, a], [, b]) => b.total - a.total)
                  .slice(0, 5)
                  .map(([key2, value2]) => (
                    <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={key + key2}>
                      <span>
                        No.{key2} {value2.name}
                      </span>
                      <mark> {value2.total >= 0 ? '+' + value2.total : value2.total}점</mark>
                    </p>
                  ))}
              </article>
            );
          })}
        </article>
      </div>
      <div className='overflow-auto'>
        <table className={styles.table}>
          <thead>
            <tr>
              {table?.[0]?.map((Content, index) => (
                <th scope='col' key={index}>
                  {index >= 2 ? (
                    <>
                      {Content[0]}
                      <sub>{Content[1]}</sub>
                    </>
                  ) : (
                    <>{Content}</>
                  )}
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
                <td scope='row'>{row[1] >= 0 ? '+' + row[1] : '-' + row[1]}</td>
                {row.slice(2).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    onClick={(e) => {
                      if (cell.total) {
                        modalopen(e);
                        setcdata(cell);
                      }
                    }}
                  >
                    {cell.total != null ? (cell.total >= 0 ? '+' + cell.total : cell.total) : ''}
                  </td>
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
      <dialog open={ismodalopen}>
        <article>
          <header>
            <button
              aria-label='Close'
              rel='prev'
              onClick={(e) => {
                modalclose(e);
              }}
            ></button>

            <h3>
              {cdata.name} {new Date(cdata.date).getUTCMonth() + 1}/{new Date(cdata.date).getUTCDate()} 기록
            </h3>
          </header>
          <main>
            <p>
              <strong>공격</strong>
            </p>
            <section style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {cdata?.attack?.map((data, index) => (
                <button className='outline' key={index}>
                  {data.title}
                </button>
              ))}
            </section>
            <p>
              <strong>수비</strong>
            </p>
            <section style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {cdata?.defense?.map((data, index) => (
                <button className='outline contrast' key={index}>
                  {data.title}
                </button>
              ))}
            </section>
            <p>
              <strong>일반</strong>
            </p>
            <section style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {cdata?.normal?.map((data, index) => (
                <button className='outline secondary' key={index}>
                  {data.title}
                </button>
              ))}
            </section>
          </main>
          <footer>
            <h3>합계 :{cdata?.total}</h3>
          </footer>
        </article>
      </dialog>
    </>
  );
}
