function updateClock() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();

    const secondDegrees = ((second / 60) * 360) - 90;
    const minuteDegrees = ((minute / 60) * 360) + ((second / 60) * 6) - 90;
    const hourDegrees = ((hour / 12) * 360) + ((minute / 60) * 30) - 90;

    document.getElementById('second-hand').style.transform = `rotate(${secondDegrees}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
    document.getElementById('hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
}

function createMarks() {
    const clock = document.querySelector('.clock');
    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        mark.className = 'mark';
        mark.style.transform = `rotate(${6 * i}deg)`;

        if (i % 5 === 0) { // 每5个刻度一个数字和更长的刻度线
            const majorTick = document.createElement('div');
            majorTick.className = 'major-tick';
            mark.appendChild(majorTick);

            const number = document.createElement('div');
            number.className = 'number';
            number.textContent = (i / 5) || 12; // 替换0为12
            number.style.transform = `translateX(-50%) rotate(${-6 * i}deg)`; // 添加反向旋转
            mark.appendChild(number);
        } else { // 普通刻度
            const tick = document.createElement('div');
            tick.className = 'tick';
            mark.appendChild(tick);
        }

        clock.appendChild(mark);
    }
}

createMarks()
setInterval(updateClock, 1000);
updateClock();
