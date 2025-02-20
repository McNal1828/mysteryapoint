'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminFlag = localStorage.getItem('isAdmin');
      console.log('0000');
      console.log(adminFlag);
      console.log('0000');
      setIsAdmin(adminFlag === 'true');
    }
  }, []);

  if (!isAdmin) {
    return (
      <nav>
        <ul>
          <li>미스야카스포인트</li>
        </ul>
        <ul>
          <li>
            <Link href={'/'}>Main</Link>
          </li>
          {/* <li>
    <Link href={'/lineup'}>라인업</Link>
  </li>
  <li>
    <Link href={'/lineupedit'}>라인업수정</Link>
  </li> */}
          <li>
            <Link href={'/attend'}>출석부</Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>미스야카스포인트</li>
        </ul>
        <ul>
          <li>
            <Link href={'/'}>Main</Link>
          </li>
          {/* <li>
        <Link href={'/lineup'}>라인업</Link>
      </li>
      <li>
        <Link href={'/lineupedit'}>라인업수정</Link>
      </li> */}
          <li>
            <Link href={'/attendinput'}>출석부입력</Link>
          </li>
          <li>
            <Link href={'/point'}>점수입력</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
