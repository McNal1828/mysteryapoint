'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdmin', 'true');
      alert('관리자 권한이 설정되었습니다.');
      router.push('/admin'); // 관리자 페이지로 이동
    }
  }, []);
  return (
    <>
      <p>권한설정중</p>
    </>
  );
}
