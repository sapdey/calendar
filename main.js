(function () {

    var container = document.getElementById("container");
    var count = 1;
    var cut = 0
    var calender, a;
    var date = new Date();
    var till = date.getDate();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    var leftButton = document.createElement('button');
    leftButton.className = "top";
    leftButton.innerText = "<";
    leftButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() - count);
        cut--;
        calender.parentNode.removeChild(calender);
        cut === 0 ? till = date.getDate() : till = 0;
        render(date, till);
    });

    var rightButton = document.createElement('button');
    rightButton.className = "top";
    rightButton.innerText = ">";
    rightButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() + count);
        cut++;
        calender.parentNode.removeChild(calender);
        cut === 0 ? till = date.getDate() : till = 0;
        render(date, till);
    });

    function render(date, till) {
        let day = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];
        let arr1 = [];
        let arr2 = [];
        let final = [];
        var start = firstDay(date.getMonth(), date.getFullYear());
        var days = lastDate(date.getMonth(), date.getFullYear());

        function firstDay(month, year) {
            return new Date(year, month, 1).getDay()
        }
        function lastDate(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }

        for (var i = 1; i <= days; i++) {
            arr1.push(i);
        }
        for (var i = 1; i < 43 - days; i++) {
            arr1.push(i);
        }
        for (var i = 0; i < 42; i++) {
            if (start < 7) {
                arr2.push(start);
                start++
            }
            else {
                start = start - 7
                arr2.push(start)
                start++
            };
        }

        for (var i = 0; i < 42; i++) {
            final.push(day[arr2[i]]);
        }
        calender = document.createElement("div");
        container.appendChild(calender);
        var top = document.createElement("span");
        top.className = "top";
        top.innerHTML = `${months[date.getMonth()]} <strong>${date.getFullYear()}</strong>`;

        calender.appendChild(leftButton);
        calender.appendChild(top);
        calender.appendChild(rightButton);

        function createCalender(calender) {
            var angle = -(20 * Math.PI) / 42;
            var step = (2 * Math.PI) / 42;
            for (var i = 0; i < final.length; i++) {
                var doc = document.createElement('span');
                var x = Math.round(300 / 2 + 180 * Math.cos(angle) + 7),
                    y = Math.round(300 / 2 + 185 * Math.sin(angle) + 107);
                doc.style.position = 'absolute'
                doc.style.left = x + 'px';
                doc.style.top = y + 'px';
                doc.innerHTML = `${final[i]}`;
                calender.appendChild(doc)
                var docDate = document.createElement('button');
                docDate.style.position = 'absolute';
                docDate.style.left = Math.round(300 / 2 + 210 * Math.cos(angle)) + 'px';
                docDate.style.top = Math.round(300 / 2 + 210 * Math.sin(angle) + 100) + 'px';
                docDate.innerHTML = arr1[i];
                calender.appendChild(docDate)
                angle += step
            }
        }
        createCalender(calender);

        a = document.querySelectorAll("button")
        for (var i = 0; i < a.length; i++) {
            if (a[i].innerHTML === String(till)) {
                if (i > days) {
                    break;
                }
                a[i].style.backgroundColor = '#ff3385';
                a[i].style.borderColor = '#ff3385';
                a[i].style.color = '#fff';
            } else if (Number(a[i].innerHTML) <= days && a[i].innerHTML > till && i <= days) {
                a[i].style.backgroundColor = '#c2c2d6';
            } else if (Number(a[i].innerHTML) < till && i < days) {
                a[i].disabled = true;
            }
        }
    }
    render(date, till);

    var create = document.createElement('span');
    create.style.position = 'absolute';
    create.style.left = '125px';
    create.style.top = '320px';
    create.innerText = "Create Event";
    create.style.fontSize = "16px";
    container.appendChild(create);

    var createEvent = document.createElement('button');
    createEvent.style.position = 'absolute';
    createEvent.style.left = '150px';
    createEvent.style.top = '350px';
    createEvent.innerText = "+";
    createEvent.id = "addEvent"
    createEvent.addEventListener('click', () => {
        var startDate = prompt('Enter the start date');
        var endDate = prompt('Enter the end date');

        var totalDays = endDate - startDate;
        var angle = -(20 * Math.PI) / 42;
        var step = (2 * Math.PI) / 42;
        angle = angle + step*(startDate-1);
        for (var i = 0; i <= totalDays; i++) {
            var events = document.createElement('span');
            var x = Math.round(300 / 2 + 165 * Math.cos(angle) + 6),
                y = Math.round(300 / 2 + 170 * Math.sin(angle) + 102);
            events.style.position = 'absolute'
            events.style.left = x + 'px';
            events.style.top = y + 'px';
            events.className = "events";
            calender.appendChild(events);
            angle += step
        }

        // for(var i=0; i< a.length; i++){
        //     if (a[i].innerHTML === String(startDate)) {
        //         // if (i > totalDays) {
        //         //     break;
        //         // }
        //         console.log(a[i].innerHTML, Number(a[i].style.cssText.split(";")[1].split(":")[1].split("p")[0]), Number(a[i].style.cssText.split(";")[2].split(":")[1].split("p")[0]));
        //     }
        //     else if (a[i].innerHTML === String(endDate)) {
        //         // if (i > totalDays) {
        //         //     break;
        //         // }
        //         console.log(a[i].innerHTML, Number(a[i].style.cssText.split(";")[1].split(":")[1].split("p")[0]));
        //     }
        // }
        // var canvas  = document.createElement('canvas');
        // canvas.style.position = 'absolute';
        // canvas.width = 300;
        // canvas.height = 300;
        // container.appendChild(canvas);
        // var ctx = canvas.getContext("2d");
        // ctx.beginPath();
        // //ctx.arc(100, 75, 165, 0, (2 * Math.PI / 42) * totalDays);
        // ctx.stroke();

    })
    container.appendChild(createEvent);
}())