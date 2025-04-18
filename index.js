// let datas = [
//     {
//         item: "早餐",
//         category: "food",
//         amount: 60,
//         date: "2025-04-18"
//     },
//     {
//         item: "捷運票",
//         category: "transport",
//         amount: 30,
//         date: "2025-04-17"
//     },
//     {
//         item: "電影票",
//         category: "entertainment",
//         amount: 280,
//         date: "2025-04-16"
//     },
//     {
//         item: "午餐",
//         category: "food",
//         amount: 120,
//         date: "2025-04-18"
//     },
//     {
//         item: "咖啡",
//         category: "food",
//         amount: 75,
//         date: "2025-04-15"
//     }
// ];

let datas = JSON.parse(localStorage.getItem('accountList')) || []

const idToName = (id) => {
    let name = undefined
    switch (id) {
        case "food":
            name = '飲食'
            break;
        case "transport":
            name = '交通'
            break;
        case "entertainment":
            name = '娛樂'
            break;
        default:
            break;
    }

    return name
}

const getData = (datas) => {



    document.getElementById('tbody').innerHTML = '' // 清空 tbody



    datas.map((data, i) => {

        let tr = document.createElement('tr') // 建立 tr

        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${data.date}</td>
            <td>${data.item}</td>
            <td>${idToName(data.category)}</td>
            <td>${data.amount}</td>
            <td><button class="btn-danger" onclick="deleteData('${data.item}')" >刪除</button></td>
        
        `

        document.getElementById('tbody').appendChild(tr)
    })

}

const filterData = () => {
    let filterKeyword = document.getElementById('filterKeyword').value

    if (filterKeyword) {
        let filterDataResults = datas.filter((data) => {
            if (data.item.includes(filterKeyword)) {
                return data
            }
        })
        getData(filterDataResults)
    } else {
        getData(datas)
    }
}


const postData = () => {

    let item = document.getElementById('item').value;
    let category = document.getElementById('category').value;
    let amount = document.getElementById('amount').value;
    let date = document.getElementById('date').value;

    if (item && category && amount && date) {
        // console.log("品名：", item);
        // console.log("種類：", category);
        // console.log("金額：", amount);
        // console.log("日期：", date);
        datas.push({
            item: item,
            category: category,
            amount: amount,
            date: date
        })
    } else {
        alert('請輸入完整!');
    }
    saveData()
    getData(datas)

}

const deleteData = (item)=>{

    datas = datas.filter((data)=>{
        if(data.item !== item){
            return item
        }

    })
    saveData()
    getData(datas)

}


const saveData = () => {

    localStorage.setItem('accountList', JSON.stringify(datas));
    // alert('已成功儲存到本機！');


}


window.onload = () => {
    getData(datas)
}
