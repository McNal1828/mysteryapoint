"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Attend() {
    const [formData, setFormData] = useState({
        date: "",
        type: "",
        members: [],
    });

    /**
     *
     * @param {Event} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("/api/attend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        alert("저장되었습니다");
        window.location.reload();
    };
    const handleCheckbox = (e) => {
        const { checked, dataset } = e.target;
        const item = {
            name: dataset.name,
            backnumber: Number(dataset.number),
        };
        setFormData((prev) => {
            if (checked) {
                return { ...prev, members: [...prev.members, item] };
            } else {
                return {
                    ...prev,
                    members: prev.members.filter(
                        (member) => member.backnumber !== item.backnumber
                    ),
                };
            }
        });
    };
    const handleRadio = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, type: value }));
    };
    const handleDate = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, date: new Date(value) }));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    aria-label="Date"
                    onChange={handleDate}
                />
                <fieldset className="grid">
                    <legend>일정 종류</legend>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="prac"
                            onChange={handleRadio}
                        />
                        연습
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="league"
                            onChange={handleRadio}
                        />
                        리그
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="pracmatch"
                            onChange={handleRadio}
                        />
                        연습시합
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="tournament"
                            onChange={handleRadio}
                        />
                        대회
                    </label>
                </fieldset>
                <fieldset>
                    <legend>참석인원</legend>
                    <label>
                        <input
                            type="checkbox"
                            data-name="김건희"
                            data-number="1"
                            onChange={handleCheckbox}
                        />
                        김건희
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="김도영"
                            data-number="10"
                            onChange={handleCheckbox}
                        />
                        김도영
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="김선홍"
                            data-number="22"
                            onChange={handleCheckbox}
                        />
                        김선홍
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="김정수"
                            data-number="6"
                            onChange={handleCheckbox}
                        />
                        김정수
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="남지우"
                            data-number="55"
                            onChange={handleCheckbox}
                        />
                        남지우
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="박재현"
                            data-number="52"
                            onChange={handleCheckbox}
                        />
                        박재현
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="송훈석"
                            data-number="3"
                            onChange={handleCheckbox}
                        />
                        송훈석
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="신동원"
                            data-number="33"
                            onChange={handleCheckbox}
                        />
                        신동원
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="신동한"
                            data-number="28"
                            onChange={handleCheckbox}
                        />
                        신동한
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="양정환"
                            data-number="23"
                            onChange={handleCheckbox}
                        />
                        양정환
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="원효석"
                            data-number="29"
                            onChange={handleCheckbox}
                        />
                        원효석
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="윤찬혁"
                            data-number="49"
                            onChange={handleCheckbox}
                        />
                        윤찬혁
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="이강훈"
                            data-number="36"
                            onChange={handleCheckbox}
                        />
                        이강훈
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="이동환"
                            data-number="98"
                            onChange={handleCheckbox}
                        />
                        이동환
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="이성재"
                            data-number="44"
                            onChange={handleCheckbox}
                        />
                        이성재
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="이종진"
                            data-number="24"
                            onChange={handleCheckbox}
                        />
                        이종진
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="이창현"
                            data-number="62"
                            onChange={handleCheckbox}
                        />
                        이창현
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="정은택"
                            data-number="27"
                            onChange={handleCheckbox}
                        />
                        정은택
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="조원주"
                            data-number="21"
                            onChange={handleCheckbox}
                        />
                        조원주
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="조재원"
                            data-number="88"
                            onChange={handleCheckbox}
                        />
                        조재원
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="조주현"
                            data-number="8"
                            onChange={handleCheckbox}
                        />
                        조주현
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="조현우"
                            data-number="18"
                            onChange={handleCheckbox}
                        />
                        조현우
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="최수진"
                            data-number="17"
                            onChange={handleCheckbox}
                        />
                        최수진
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="최웅수"
                            data-number="19"
                            onChange={handleCheckbox}
                        />
                        최웅수
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="홍성운"
                            data-number="2"
                            onChange={handleCheckbox}
                        />
                        홍성운
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="홍승표"
                            data-number="26"
                            onChange={handleCheckbox}
                        />
                        홍승표
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            data-name="홍승표"
                            data-number="7"
                            onChange={handleCheckbox}
                        />
                        홍인표
                    </label>
                </fieldset>
                <input type="submit" value="저장" />
            </form>
        </>
    );
}
