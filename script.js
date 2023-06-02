// null로 초기화된 변수
// 테이블이나 목록에서 선택된 행을 추적해야 할 때 사용됨
// 행이 선택되면 해당하는 값이나 참조를 selectedRow에 할당하여 선택된 행을
// 코드의 다른 부분에서 나중에 사용 가능함.
var selectedRow =  null;

// 알림 생성
function showAlert(message, className) {
    const div = document.createElement("div");
    // div에 className 속성을 설정하여 할당함 => alert와 alert-<className>으로 설정 가능함.
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    // querySelector를 통해 .container와 .main 클래스를 갖는 요소를 찾음.
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    //div를 container요소 내의 main 요소 앞에 삽입함.
    container.insertBefore(div, main);
    // 3초 후에 실행되는 함수를 정의 => 3초후에 ".alert" 클래스를 갖는 요소를 삭제함
    // => 알림이 자동으로 사라짐
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// 입력 필드 초기화!!!!
function clearFields() {
    // .value를 사용하여 해당 요소의 값을 빈 문자열("")로 설정 => 입력 필드 내용이 지워짐
    document.querySelector("#firstName").value="";
    document.querySelector("#lastName").value="";
    document.querySelector("#rollNo").value="";
}

// 생성
// querySelector를 통해student-form"이라는 id를 가진 폼 요소를 찾음
// addEventListener를 사용하여 submit(제출) 이벤트를 감지하고, 이벤트 발생 시 실행되는 콜백 함수를 정의
// 콜백 함수는 e라는 매개변수를 가지며, 제출 이벤트 객체를 나타냄.
document.querySelector("#student-form").addEventListener("submit", (e) => {
    // e.preventDefault를 호출하여 제출 이벤트의 기본 동작을 중단
    // => 폼이 서버로 데이터를 전송하는 것을 방지
    e.preventDefault();

    // querySelector를 통해 요소의 값을 가져와, 사용자가 폼에 입력한 값을 변수에 저장
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    // 유효성 확인
    // 어떤 입력 필드라도 비어있는지 확인, 만약 비어있는 필드가 있다면
    // showAlert("Plz fill in all fields", "danger")를 호출
    if(firstName == "" || lastName == "" || rollNo == "") {
        showAlert("Plz fill in all fields", "danger");
    }
    else{
        // 입력 필드가 모두 채워져 있다면, 새로운 행을 생헝하고 데이터를 추가
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            // <tr> 요소를 생성
            const row = document.createElement("tr");
            // 생성된 <tr> 요소의 HTML 내용을 설정
            // 각 요소 값을 표시하고, "Edit", "Delete" 버튼을 추가 
            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            // <tr> 요소를 student-list 요소에 추가 
            list.appendChild(row);
            // 선택된 행을 초기화
            selectedRow = null;
            showAlert("Student Added", "Success");
        }
        else {
            // 만약 selectedRow = null 이라면, 선택된 행이 있는 경우이므로 데이터를 수정
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        //clearFields를 호출하여 입력 필드의 내용을 모두 지움
        clearFields();
    }
})

// 수정
// addEventListener()를 사용하여  클릭 이벤트를 해당 요소에 추가
// 클릭 이벤트가 발생했을 때 실행되는 콜백 함수를 정의 
// 이 콜백 함수는 e라는 매개변수를 가지며, 클릭 이벤트 객체를 의미
document.querySelector("#student-list").addEventListener("click", (e) => {
    // 클릭한 요소를 target 변수에 할당 
    target = e.target
    // 클릭한 요소가 edit 클래스를 가지고 있는지 확인하고, 만약 가지고 있다면 아래 작업을 수행
    if(target.classList.contains("edit")) {
        // 선택된 행을 찾아서 selectedRow 변수에 할당
        // 여기서 target => edit 버튼으로 그 부모 요소의 부모 요소를 찾아야 선택된 행을 얻음
        selectedRow = target.parentElement.parentElement;
        // 선택된 행의 n 번째 자식 요소의 텍스트 내용을 " "요소의 값으로 설정 ex)"firstName"
        // 이를 통해 편집할 데이터의 첫 번째 필드를 " "입력 필드에 표시 ex)"firstName"
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }
});

// 삭제
// addEventListener()를 사용하여  클릭 이벤트를 해당 요소에 추가
// 클릭 이벤트가 발생했을 때 실행되는 콜백 함수를 정의 
// 이 콜백 함수는 e라는 매개변수를 가지며, 클릭 이벤트 객체를 의미
document.querySelector("#student-list").addEventListener("click", (e) => {
    // 클릭한 요소를 target 변수에 할당 
    target = e.target;
    // 클릭한 요소가 delete 클래스를 가지고 있는지 확인하고, 만약 가지고 있다면 아래 작업을 수행
    if(target.classList.contains("delete")) {
        // 선택된 행을 삭제, target => delete 버튼이므로 그 부모 요소의 부모 요소를 찾아서 행을 삭제
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});