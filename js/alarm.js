document.getElementById('setAlarm').addEventListener('click', function() {
    document.getElementById('alarmDialog').style.display = 'flex';
});

document.getElementById('saveAlarm').addEventListener('click', function() {
    const alarmDateTime = document.getElementById('alarmDateTime').value;
        if (alarmDateTime) {
            const alarmDate = new Date(alarmDateTime);
            const alarm = {
                date: alarmDate,
                enabled: false
            };
            alarms.push(alarm);

            const listItem = document.createElement('li');
            const toggleButton = document.createElement('button');
            toggleButton.textContent = '关';
            toggleButton.onclick = function() {
                alarm.enabled = !alarm.enabled;
                toggleButton.textContent = alarm.enabled ? '关' : '开';
            };
            const hourMinuteText = document.createElement('p')
            const monthDayText = document.createElement('p')
            hourMinuteText.className = 'hourMinute'
            monthDayText.className = 'monthDay'
            hourMinuteText.textContent = alarmDate.getHours().toString().padStart(2, '0') + ":" + alarmDate.getMinutes().toString().padStart(2, '0');
            monthDayText.textContent = (alarmDate.getMonth() + 1).toString() + "月" + alarmDate.getDate().toString() + "日";
            listItem.appendChild(hourMinuteText)
            listItem.appendChild(monthDayText)
            listItem.appendChild(toggleButton)
            document.getElementById('alarmList').appendChild(listItem);
            document.getElementById('alarmDialog').style.display = 'none';
            document.getElementById('alarmDateTime').value = '';
        } else {
            alert("请输入有效时间");
        }
});

const alarms = []; // 存储所有闹钟时间的数组

// 检查闹钟是否应该响起
function checkAlarms() {
    const now = new Date();
    alarms.forEach(function(alarm) {
        if (alarm.enabled && alarm.date <= now) {
            document.getElementById('alarmSound').play();
        }
    });
}

// 每10s检查一次
setInterval(checkAlarms, 10000);