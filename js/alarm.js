document.getElementById('setAlarm').addEventListener('click', function() {
        document.getElementById('alarmDialog').style.display = 'block';
});

document.getElementById('saveAlarm').addEventListener('click', function() {
    const alarmDateTime = document.getElementById('alarmDateTime').value;
    if (alarmDateTime) {
        const alarmDate = new Date(alarmDateTime);
        alarms.push(alarmDate); // 将新的闹钟时间添加到数组中

        const listItem = document.createElement('li');
        listItem.textContent = "闹钟设定于: " + new Date(alarmDateTime).toLocaleString();
        document.getElementById('alarmList').appendChild(listItem);
        document.getElementById('alarmDialog').style.display = 'none';
        document.getElementById('alarmDateTime').value = '';
    } else {
        alert("请输入有效的时间");
    }
});

const alarms = []; // 存储所有闹钟时间的数组

// 检查闹钟是否应该响起
function checkAlarms() {
    const now = new Date();
    alarms.forEach(function(alarm, index) {
        if (alarm <= now) {
            document.getElementById('alarmSound').play();
            alarms.splice(index, 1); // 删除已经响起的闹钟
        }
    });
}

// 每分钟检查一次
setInterval(checkAlarms, 60000);