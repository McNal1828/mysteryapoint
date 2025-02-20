import Image from 'next/image';
import styles from './page.module.css';

export default function Lineup() {
  return (
    <>
      <div>
        <nav className='overflow-auto'>
          <ul>
            <li>날짜</li>
            <li>날짜</li>
            <li>날짜</li>
            <li>날짜</li>
            <li>날짜</li>
            <li>날짜</li>
          </ul>
        </nav>
      </div>
      <div className={`grid ${styles.maingrid}`}>
        <article style={{ minHeight: '700px' }}>
          <header>포지션</header>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src={'/bf.png'} fill alt='field' objectFit='contain'></Image>
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.pitcher}`} alt='Pitcher' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.catcher}`} alt='Catcher' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.firstbase}`} alt='First Base' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.secondbase}`} alt='Second Base' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.thirdbase}`} alt='Third Base' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.shortstop}`} alt='Shortstop' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.leftfield}`} alt='Left Field' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.rightfield}`} alt='Right Field' />
            <img src='/profile/3.jpg' className={`${styles.player} ${styles.centerfield}`} alt='Center Field' />
          </div>
        </article>
        <article>
          <header>라인업</header>
          <table>
            <thead>
              <tr>
                <th scope='col'>오더</th>
                <th scope='col'>이름</th>
                <th scope='col'>포지션</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
              <tr>
                <th>1</th>
                <td>송훈석</td>
                <td>1</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>대기</th>
                <td colSpan='2'>송훈석, 송훈석, 송훈석, 송훈석</td>
              </tr>
            </tfoot>
          </table>
        </article>
      </div>
    </>
  );
}
