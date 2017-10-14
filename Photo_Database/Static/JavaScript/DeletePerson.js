function showPeople() {  // Deklarerar funktionen

    $("#peopleTable tbody").empty();

    $.ajax({
        url: '/api/GetPeople',
        method: 'GET',
    })
        .done(function (result) {

            let tbody = $("#peopleTable tbody") 

            console.log(result)
            for (let p of result) {

                tbody.append(`
                    <tr>
                        <td class"cellid">${p.Id}</td>
                        <td class="cellname">${p.Name}</td>
                        <td class="cellcontext">${p.Context}</td>
                        <td><button class="delete" id="${p.Id}">Ta bort</button>
                        </td>
                    </tr>`)
                console.log(`Personens namn är ${p.Name} och id är ${p.Id}`)
            }
        })
    //.fail($("#response").html(`Något gick fel!`));
}

showPeople();

//$("#deletePerson").click(function () {
$("body").on("click", ".delete", function () {

    console.log("Logged")

    console.log($(this).attr("id"))

    let answer = confirm("Vill du ta bort denna person?")

    //alert(answer)

    ////let id = $("#id2").val()
    let id = $(this).attr("id")

    //console.log(`Loggar in. Person-Id är ${id} och Namnet är ${n}`)

    $.ajax({
        url: '/api/DeletePerson',
        method: 'POST',
        data: {
            id: id,
        }
    })
        .done(function (result) {     //Var kommer "result" ifrån?
            $("#response").html(`Personen har tagits bort från databasen`);
            showPeople()
        })
        .fail(function (xhr, status, error) {

            console.log(xhr.responseJSON.Message)

            if (xhr.responseJSON.Message == "id_error") {

                $("#response").html(`Skriv in ett Person-Id med siffra/siffror`);
            }
        })
})