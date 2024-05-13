const alarms = []; // 存储所有闹钟时间的数组
let repeatDays = []; // 存储用户选择的重复日期
let now_alarm_index; // 表示当前只在访问的闹钟的下标

// ******************************* 添加闹钟 *******************************
document.getElementById('setAlarm').addEventListener('click', function() {
    document.getElementById('alarm-dialog').style.display = 'flex';
});

// 若不保存直接返回则是将内容全部清空，复选框复原
document.getElementById('alarm-dialog-return').addEventListener('click', function () {
    document.getElementById('alarmTime').value = '';
    repeatDays = []
    document.getElementById('repetition-result').innerHTML = '永不';
    const checkboxes = document.querySelectorAll('.repetition-type input[type="checkbox"]');
    checkboxes.forEach(function (checkbox){
        checkbox.checked = false;
    })
    document.getElementById('select-label-result').value = '闹钟'
    document.getElementById('alarm-dialog').style.display = 'none';
})

document.getElementById('saveAlarm').addEventListener('click', function() {
    const alarmTime = document.getElementById('alarmTime').value;
    if (alarmTime) {
        const now = new Date();
        const inputTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmTime.split(":")[0], alarmTime.split(":")[1]);

        // 对输入时间进行修正
        if (repeatDays.length === 0 && inputTime < now){
            inputTime.setDate(now.getDate() + 1);
        }else{
            let nextAlarmDate = inputTime;
            while (!repeatDays.includes(nextAlarmDate.getDay()) || inputTime < now) {
                nextAlarmDate.setDate(nextAlarmDate.getDate() + 1);
            }
        }

        const alarm = {
            date: inputTime,
            repeat: repeatDays,
            label: "",
            enabled: true
        };

        const listItem = document.createElement('li');
        // 给每个列表项分配一个属性，用于与其在alarms中的下标绑定，便于编辑操作
        listItem.setAttribute('data-index', alarms.length + "");
        const toggleButton = document.createElement('button');
        toggleButton.textContent = '开';
        toggleButton.onclick = function() {
            alarm.enabled = !alarm.enabled;
            toggleButton.textContent = alarm.enabled ? '开' : '关';
            return false;
        };
        const alarmInfo = document.createElement('div');
        const hourMinuteText = document.createElement('p');
        const alarmDetail = document.createElement('p');
        hourMinuteText.className = 'hourMinute';
        alarmDetail.className = 'alarm-detail';
        hourMinuteText.textContent = inputTime.getHours().toString().padStart(2, '0') + ":" + inputTime.getMinutes().toString().padStart(2, '0');
        const labelResult = document.getElementById('select-label-result');
        // 设置闹钟的标签信息
        alarm.label = labelResult.value;
        const repetitionResult = document.getElementById('repetition-result');
        alarmDetail.textContent = labelResult.value + '，' + repetitionResult.innerText;
        alarmInfo.appendChild(hourMinuteText);
        alarmInfo.appendChild(alarmDetail);
        listItem.appendChild(alarmInfo);
        listItem.appendChild(toggleButton);
        document.getElementById('alarmList').appendChild(listItem);

        // 先等labelResult这个元素得到后，设置好alarm的label属性再添加值数组中
        alarms.push(alarm);

        // 复原
        console.log('ok')

        document.getElementById('alarm-dialog').style.display = 'none';
        document.getElementById('alarmTime').value = '';
        repeatDays = []
        document.getElementById('repetition-result').innerHTML = '永不';
        const checkboxes = document.querySelectorAll('.repetition-type input[type="checkbox"]');
        checkboxes.forEach(function (checkbox){
            checkbox.checked = false;
        })
        document.getElementById('select-label-result').value = '闹钟'
    } else {
        alert("请输入有效时间");
    }
});

// ******************************* 编辑闹钟对话框的相关函数 *******************************
// 为 ul 元素添加了一个点击事件的监听器。当用户点击 ul 元素内的任何子元素时，事件会冒泡到 ul 元素，然后我们可以通过 event.target 获取到实际被点击的元素
document.getElementById('alarmList').addEventListener('click', function(event) {
    const target = event.target;

    // 通过 target 获取 data-index 属性值
    const dataIndex = target.getAttribute('data-index');
    console.log(dataIndex)
    console.log(alarms)
    // 将值传给全局变量，表示当前只在访问的闹钟的下标
    now_alarm_index = dataIndex;
    // 根据 data-index 获取对应的闹钟信息
    const alarm = alarms[dataIndex];
    console.log(alarm);

    // 复现闹钟信息至闹钟编辑对话框中
    const alarmTime = document.getElementById('edit-alarmTime')
    alarmTime.value = alarm.date.getHours().toString().padStart(2, '0') + ":" + alarm.date.getMinutes().toString().padStart(2, '0');

    const repetitionResult = document.getElementById('edit-repetition-result');
    repeatDays = alarm.repeat;
    if (repeatDays.length === 0) {
        repetitionResult.innerHTML = '永不';
    } else if (repeatDays.length === 7){
        repetitionResult.innerHTML = '每天';
    } else{
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const sortedDays = repeatDays.sort((a, b) => a - b);
        repetitionResult.innerHTML = sortedDays.map(day => weekdays[day]).join('、');
    }

    const labelResult = document.getElementById('edit-select-label-result');
    labelResult.value = alarm.label;
    document.getElementById('edit-alarm-dialog').style.display = 'flex';
});

document.getElementById('edit-alarm-dialog-return').addEventListener('click', function () {
    document.getElementById('edit-alarm-dialog').style.display = 'none';
})

document.getElementById('edit-save-alarm').addEventListener('click', function (){
    const alarmTime = document.getElementById('edit-alarmTime').value;
    if (alarmTime) {
        const now = new Date();
        const inputTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmTime.split(":")[0], alarmTime.split(":")[1]);

        // 对输入时间进行修正
        if (repeatDays.length === 0 && inputTime < now) {
            inputTime.setDate(now.getDate() + 1);
        } else {
            let nextAlarmDate = inputTime;
            while (!repeatDays.includes(nextAlarmDate.getDay()) || inputTime < now) {
                nextAlarmDate.setDate(nextAlarmDate.getDate() + 1);
            }
        }

        const alarm = alarms[now_alarm_index];
        alarm.date = inputTime;
        alarm.repeat = repeatDays;

        const listItem = document.querySelector(`ul.alarmList li[data-index="${now_alarm_index}"]`);
        const prevDiv = listItem.getElementsByTagName('div')[0];
        // 原有数据清空
        prevDiv.innerHTML = '';
        const hourMinuteText = document.createElement('p');
        const alarmDetail = document.createElement('p');
        hourMinuteText.className = 'hourMinute';
        alarmDetail.className = 'alarm-detail';
        hourMinuteText.textContent = inputTime.getHours().toString().padStart(2, '0') + ":" + inputTime.getMinutes().toString().padStart(2, '0');
        const labelResult = document.getElementById('edit-select-label-result');
        // 设置闹钟的标签信息
        alarm.label = labelResult.value;
        const repetitionResult = document.getElementById('edit-repetition-result');
        alarmDetail.textContent = labelResult.value + '，' + repetitionResult.innerText;
        prevDiv.appendChild(hourMinuteText);
        prevDiv.appendChild(alarmDetail);

        // // 退出并复原
        document.getElementById('edit-alarm-dialog').style.display = 'none';
        repeatDays = []
    } else{
        alert("请输入有效时间");
    }

})


// ******************************* 重复对话框的设置 *******************************
// 为复选框设置一个全局监听器
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.repetition-type input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                repeatDays.push(parseInt(this.value));
            } else {
                const index = repeatDays.indexOf(parseInt(this.value));
                if (index !== -1) {
                    repeatDays.splice(index, 1);
                }
            }
        });
    });
});

// ******************************* 添加闹钟中的点击事件 *********************************************************
document.getElementById('select-repetition').addEventListener('click', function (){
    document.getElementById('repetition-dialog').style.display = 'flex';
})

// ******************************* 编辑闹钟中的点击事件 ********************************************************
document.getElementById('edit-select-repetition').addEventListener('click', function (){
    // 当编辑闹钟时打开重复的复选框后，会显示当前打钩的情况
    console.log(repeatDays);
    if (repeatDays.length !== 0){
        const checkboxes = document.querySelectorAll('.repetition-type input[type="checkbox"]');
        checkboxes.forEach(function (checkbox){
            if (repeatDays.includes(parseInt(checkbox.value))){
                console.log('ok')
                checkbox.checked = true;
            }
        })
    }
    document.getElementById('repetition-dialog').style.display = 'flex';
})

// 当用户点击返回键后顺带保存了用户选择的信息
document.getElementById('repetition-dialog-return').addEventListener('click', function () {
    const repetitionResult = document.getElementById('repetition-result');
    const editRepetitionResult = document.getElementById('edit-repetition-result');
    if (repeatDays.length === 0) {
        repetitionResult.innerHTML = '永不';
        editRepetitionResult.innerHTML = '永不';
    } else if (repeatDays.length === 7){
        repetitionResult.innerHTML = '每天';
        editRepetitionResult.innerHTML = '每天';
    } else{
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const sortedDays = repeatDays.sort((a, b) => a - b);
        repetitionResult.innerHTML = sortedDays.map(day => weekdays[day]).join('、');
        editRepetitionResult.innerHTML = sortedDays.map(day => weekdays[day]).join('、');
    }
    document.getElementById('repetition-dialog').style.display = 'none';
})


// 检查闹钟是否应该响起
function checkAlarms() {
    const now = new Date();
    alarms.forEach(function(alarm) {
        if (alarm.enabled && alarm.date <= now) {
            document.getElementById('alarmSound').play();

            if (alarm.repeat.length === 0) {
                // 如果 repeatDays 长度为 0，则将 enabled 设置为 false
                alarm.enabled = false;
            } else {
                // 根据 repeatDays 中的内容寻找下一次闹钟的重复日期并修改 date 的值
                let nextAlarmDate = alarm.date;
                while (!alarm.repeat.includes(nextAlarmDate.getDay())) {
                    nextAlarmDate.setDate(nextAlarmDate.getDate() + 1);
                }
                alarm.date = nextAlarmDate;
            }
        }
    });
}


// 每10s检查一次
setInterval(checkAlarms, 10000);