$("#login").click(function () {

    let n = $("#name").val()
    let c = $("#context").val()

    console.log(`Loggar in. Namnet är ${n} och kontext är ${c}`)

    $.ajax({
        url:'/api/AddPerson',
        method: 'POST',
        data: {
            name: n,
            context: c
        }
    })
        .done(function (result) {
            $("#response").html(`#response`).html(`Svar: ${result}`);
        })
        .fail(function (xhr, status, error) {
            $("#error").html(`#Error! ${xhr.responseJSON.Message}`);
        })
})

