document.getElementById('setAlarm').addEventListener('click', function() {
    document.getElementById('alarmDialog').style.display = 'block';
});

document.getElementById('saveAlarm').addEventListener('click', function() {
    const timeValue = document.getElementById('alarmTime').value;
    if (timeValue) {
        const now = new Date(); // 获取当前日期和时间
        const [hours, minutes] = timeValue.split(':').map(Number); // 分解小时和分钟
        const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes); // 创建一个新的Date对象，日期为今天，时间为用户选择的时间

        alarms.push(alarmDate); // 将新的闹钟时间添加到数组中

        const listItem = document.createElement('li');
        const itemText = document.createElement('p')
        itemText.textContent = alarmDate.getHours().toString().padStart(2, '0') + ":" + alarmDate.getMinutes().toString().padStart(2, '0'); // 使用toLocaleString()显示日期和时间
        listItem.appendChild(itemText)
        document.getElementById('alarmList').appendChild(listItem);
        document.getElementById('alarmDialog').style.display = 'none';
        document.getElementById('alarmTime').value = ''; // 重置时间输入字段
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