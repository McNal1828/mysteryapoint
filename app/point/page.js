'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import Dates from './dates';

function sumPoints(arr) {
  return arr.reduce((sum, item) => sum + item.point, 0);
}
export default function Point() {
  const [dates, setdates] = useState([]);
  const [date, setdate] = useState('');
  const [attend, setattend] = useState([]);
  const [data, setdata] = useState([]);
  const [selectedPlayer, setselectedPlayer] = useState({ backnumber: 0, name: '선수를 선택해주세요' });
  const [selectvalue, setselectvalue] = useState('default');

  const attackSet = [
    { title: '1루타', point: 10 },
    { title: '2루타', point: 20 },
    { title: '3루타', point: 30 },
    { title: '홈런', point: 50 },
    { title: '득점', point: 5 },
    { title: '타점', point: 10 },
    { title: '4사구', point: 5 },
    { title: '희생타', point: 5 },
    { title: '아웃', point: -5 },
    { title: '삼진', point: -10 },
    { title: '주루사', point: -10 },
    { title: '병살타', point: -10 },
    { title: '도루실패', point: -5 },
    { title: '실책', point: -10 },
    { title: '포수도루저지', point: 50 },
    { title: '사이클링히트', point: 100 },
  ];

  const defenseSet = [
    { title: '이닝', point: 15 },
    { title: '탈삼진', point: 5 },
    { title: '4사구', point: -5 },
  ];
  const normalSet = [
    { title: '참석', point: 25 },
    { title: '지각', point: -10 },
    { title: '무단불참', point: -25 },
  ];

  useEffect(() => {
    fetch('/api/dates', { cache: 'no-store' })
      .then((data) => data.json())
      .then((data) => {
        setdates(data.dates);
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (date) {
      fetch(`/api/point?date=${date}`, { cache: 'no-store' })
        .then((data) => data.json())
        .then((data) => {
          setdata(data.data);
        });

      fetch(`/api/attend?date=${date}`, { cache: 'no-store' })
        .then((data) => data.json())
        .then((data) => {
          setattend(data.attend);
        });
    }
    return () => {
      setattend([]);
      setdata([]);
      setselectedPlayer({ backnumber: 0, name: '선수를 선택해주세요' });
      setselectvalue('default');
    };
  }, [date]);
  useEffect(() => {
    if (selectvalue !== 'default') {
      console.log(data);
      console.log(data.filter((player) => player.backnumber == selectvalue)[0]);
      setselectedPlayer(data.filter((player) => player.backnumber == selectvalue)[0]);
    }
  }, [selectvalue, data]);

  const addData = (title, point, type) => {
    setdata((prevData) => {
      const newData = [...prevData];
      const edit = newData.find((obj) => obj.backnumber == selectvalue);
      edit[type] = [...edit[type], { title, point }];
      return newData;
    });
  };
  const delData = (index, type) => {
    setdata((prevData) => {
      const newData = [...prevData];
      const edit = newData.find((obj) => obj.backnumber == selectvalue);
      edit[type] = edit[type].filter((_, dataindex) => dataindex !== index);
      return newData;
    });
  };

  return (
    <>
      <section>
        <Dates dates={dates} setdate={setdate} />
        {date ? (
          <div className='grid'>
            <div>
              <select
                id='select'
                name='select'
                aria-label='Select'
                value={selectvalue}
                onChange={(e) => {
                  setselectvalue(e.target.value);
                }}
              >
                <option disabled value={'default'}>
                  선수선택
                </option>
                {attend.map((obj) => (
                  <option key={obj.backnumber} value={obj.backnumber}>
                    {obj.name}
                  </option>
                ))}
              </select>
              <section style={{ display: 'flex', gap: '70px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Image width={200} height={200} alt='이미지' src={`/profile/${selectedPlayer.backnumber}.jpg`} />
                <h2>{selectedPlayer.name}</h2>
              </section>
              <div>
                <section style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedPlayer?.attack?.map((data, index) => (
                    <button
                      className='outline'
                      key={index}
                      onClick={(e) => {
                        delData(index, 'attack');
                      }}
                    >
                      {data.title}
                    </button>
                  ))}
                </section>
                <section style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedPlayer?.defense?.map((data, index) => (
                    <button
                      className='outline contrast'
                      key={index}
                      onClick={(e) => {
                        delData(index, 'defense');
                      }}
                    >
                      {data.title}
                    </button>
                  ))}
                </section>
                <section style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedPlayer?.normal?.map((data, index) => (
                    <button
                      className='outline secondary'
                      key={index}
                      onClick={(e) => {
                        delData(index, 'normal');
                      }}
                    >
                      {data.title}
                    </button>
                  ))}
                </section>
                <section>
                  <h3>
                    합계 :
                    {selectedPlayer.backnumber === 0
                      ? 0
                      : sumPoints(selectedPlayer.attack) + sumPoints(selectedPlayer.defense) + sumPoints(selectedPlayer.normal)}
                  </h3>
                </section>
              </div>
            </div>
            <div>
              {selectvalue !== 'default' ? (
                <>
                  <article>
                    <header>
                      <h3>공격</h3>
                    </header>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {attackSet.map((item) => (
                        <button
                          key={item.title}
                          onClick={(e) => {
                            addData(item.title, item.point, 'attack');
                          }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </article>
                  <article>
                    <header>
                      <h3>투수</h3>
                    </header>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {defenseSet.map((item) => (
                        <button
                          key={item.title}
                          className='contrast'
                          onClick={(e) => {
                            addData(item.title, item.point, 'defense');
                          }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </article>
                  <article>
                    <header>
                      <h3>일반</h3>
                    </header>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {normalSet.map((item) => (
                        <button
                          key={item.title}
                          className='secondary'
                          onClick={(e) => {
                            addData(item.title, item.point, 'normal');
                          }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </article>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </section>
      {date ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={(e) => {
              fetch('/api/point', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              }).then((res) => {
                if (res.ok) {
                  alert('저장되었습니다.');
                } else {
                  alert('오류발생');
                }
              });
            }}
          >
            저장
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
