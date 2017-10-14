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
                        </td>
                    </tr>`)
                console.log(`Personens namn är ${p.Name} och id är ${p.Id}`)
            }
        })
    //.fail($("#response").html(`Något gick fel!`));
}

showPeople();
