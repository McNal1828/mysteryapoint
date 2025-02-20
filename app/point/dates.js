'use client';
/**
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {Array<string>} props.dates - 날짜 문자열 배열로, 렌더링할 데이터
 * @param {Function} props.setdate - 날짜 문자열 배열로, 렌더링할 데이터
 */
export default function Dates({ dates, setdate }) {
  return (
    <>
      <select
        id='select2'
        name='select2'
        aria-label='Select'
        // value={selectvalue}
        defaultValue={'default'}
        onChange={(e) => {
          setdate(e.target.value);
        }}
      >
        <option disabled value={'default'}>
          날짜 선택
        </option>
        {dates.map((datestring) => {
          const date = new Date(datestring); // ISO 형식을 Date 객체로 변환
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
          const day = date.getDate().toString().padStart(2, '0'); // 일
          return (
            <option key={datestring} value={datestring}>
              {month}/{day}
            </option>
          );
        })}
      </select>
    </>
  );
}
