function showPeople() {  // Deklarerar funktionen

    $("#peopleTable tbody").empty();

    $.ajax({
        url: '/api/GetPeople',
        method: 'GET',
    })
        .done(function (result) {

            let tbody = $("#peopleTable tbody") // Pekar på tbody i tabellen peopleTable
            //let update = $("#updatePerson")
            //let deleteButtonId = p.Id

            console.log(result)
            for (let p of result) {

                tbody.append(`
                    <tr>
                        <td class"cellid">${p.Id}</td>
                        <td class="cellname">${p.Name}</td>
                        <td class="cellcontext">${p.Context}</td>
                        <td><button class="update" id="${p.Id}">Uppdatera</button></td>                        
                        </td>
                    </tr>`)
                console.log(`Personens namn är ${p.Name} och id är ${p.Id}`)
            }
        })
    //.fail($("#response").html(`Något gick fel!`));
}

showPeople();

$("#addPerson").click(function () {  // Funktionen som körs när knappen trycks

    let n = $("#name").val()
    let c = $("#context").val()

    console.log(`Loggar in. Namnet är ${n} och kontext är ${c}`)

    $.ajax({
        url: '/api/AddPerson',
        method: 'POST',
        data: {
            name: n,
            context: c
        }
    })
        .done(function (result) {
            $("#response").html(`Personen har lagts till i databasen`);
            showPeople()
        })
        .fail(function (xhr, status, error) {

            console.log(xhr.responseJSON.Message)

            if (xhr.responseJSON.Message == "personerror") {

                $("#response").html(`Skriv in ett namn som är minst fyra bokstäver långt`);
            }

            else if (xhr.responseJSON.Message == "contexterror") {

                $("#response").html(`Skriv in en kontext som är minst tre bokstäver lång`);
            }
        })
})

//$("#deletePerson").click(function () {
$("body").on("click", ".delete", function () {

    console.log("Logged")

    console.log($(this).attr("id"))

    let answer = confirm("Do you want to delete this person?")

    alert(answer)

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

$("body").on("click", ".update", function () {  // När man klickar på Uppdatera i Tabellen

    let id = $(this).attr("id")

    let cellnameContent = $(this).parent().siblings(".cellname").text()  // "text" ger alla tecken, medan "html" tolkar taggarna
    let cellcontextContent = $(this).parent().siblings(".cellcontext").text() // Tom parentes Hämtar värden, medan värden inom parenteserna Skickar in värdena

    //alert(cellnameContent)
    //alert(cellcontextContent)

    //$("#updateHeading").html(`<i>Person-Id: ${id} <br/>
    //                             Namn: ${cellnameContent}<br/>
    //                             Kontext: ${cellcontextContent}</i>`);

    $("#textid").html(`<i>Person-id ${id}<i/>`);
    $("#id1").val(id);
    $("#name2").val(cellnameContent);
    $("#context2").val(cellcontextContent);

    $("#hide").show();

    //$.ajax({
    //    url: '/api/GetPeople',
    //    method: 'GET',
    //})
    //    .done(function (result) {

    //        //let update = $("#updatePerson")
    //        //let deleteButtonId = p.Id

    //        console.log(result)

    //            let id = $(this).attr("id")

    //            //paragraph.append(`${p.Id}${p.Name}${p.Context}${p.Id}""${p.Id}`)
    //            $("#updateHeading").html(`Person-Id: ${p.Id}, Namn: ${p.Name}, Kontext: ${p.Context}`);

    //            //console.log(`Personens namn är ${p.Name} och id är ${p.Id}`)
    //    })


    //let id = $(this).attr("id")
    //let n = "apa"

})


$("#updatePerson").click(function () {

    let tbody = $("#peopleTable tbody") // Pekar på tbody i tabellen peopleTable
    //let id = $("#peopleTable tbody").siblings(".cellid").text()  // "text" ger alla tecken, medan "html" tolkar taggarna
    let id = $("#id1").val() 
    let n = $("#name2").val()
    let c = $("#context2").val()

    $.ajax({
        url: '/api/updatePerson',
        method: 'POST',
        data: {
            id: id,
            name: n,
            context: c
        }
    })
        .done(function (result) {
            $("#response").html(`Personen har uppdaterats i databasen`);
            showPeople()
        })
        .fail(function (xhr, status, error) {

            console.log(xhr.responseJSON.Message)

            if (xhr.responseJSON.Message == "personerror") {

                $("#response").html(`Skriv in ett namn som är minst fyra bokstäver långt`);
            }

            else if (xhr.responseJSON.Message == "contexterror") {

                $("#response").html(`Skriv in en kontext som är minst tre bokstäver lång`);
            }
        })
})