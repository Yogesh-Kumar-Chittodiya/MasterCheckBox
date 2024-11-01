// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
// import * as bootstrap from "bootstrap"
import "./style"
import "./jquery"

$(function(){
    $('[data-bs-toggle="tooltip"]').tooltip();
    // $(".copy-link").tooltip()
});

// $(".copy-link").on('mouseenter',function(){
//     $(this).attr("title","Copy buy link to clipboard").tooltip("show")
// })



var counter = 0;
$(".book-select-check").on("click",function(){
    if($(this).prop("checked")){
        counter+=1;
        // $("#delete-books").css("display","block");
        $("#delete-books").text(`Delete ${pluralize(counter,"Book")}`);
        $("#delete-books").show();
        console.log("checkbox selected : "+counter)
    }
    else{
        counter--;
        console.log("total checkbox selected : "+counter)
        $("#delete-books").text(`Delete ${pluralize(counter,"Book")}`);
        if(counter <= 0){
            // $("#delete-books").css("display","none");
            $("#delete-books").hide();
        }   
    }
});


$("#delete-books").on("click",function(){
    var bookIds=[];

    $(".book-select-check").each(function(){
        if($(this).prop("checked")){
            bookIds.push($(this).data("book-id"))
        }
    });
    // alert(bookIds)

    if(confirm("Are you sure? you wanted to delete selected books.")){
        counter=0
        $.ajax({
            url: 'books/bulk_delete_books',
            type: "DELETE",
            data: { book_ids: bookIds },
            beforeSend: () => {
                $("#loader").show()
            },
            complete: () => {
                $("#loader").hide()
            },
            success: () => {
                // alert("Selected books deleted successfully.")
                $("#flash-notification").html(
                    `<div class="alert alert-success" role="success">
                        Your request has been executed successfully. Selected books has been deleted from the database.
                    </div>`
                )
                setInterval(function(){
                    $(".alert").fadeOut();
                }, 2000)
            }
        });
    }else{
        return false;
    }

});


const pluralize = (counter,string) => {
    if(counter>1){
        return `${counter} ${string}s`
    }else{
        return `${counter} ${string}`
    }
}


$("#master-book-check").on("click",function(){
    $(".book-select-check").prop("checked",$(this).prop("checked"))

    var counter=0
    if($(this).prop("checked")){
        counter=$(".book-select-check").length
        $("#delete-books").text(`Delete ${pluralize(counter,"Book")}`)
        $("#delete-books").show()
    }else{
        $("#delete-books").hide()
    }
});


$(".copy-link").on('click',function(){
    const link=$(this).prev('a').attr("href");
    // alert(link);

    var temp = $("<input>");
    $("body").append(temp);
    temp.val(link).select();
    document.execCommand('copy');

    temp.remove();
    $(this).attr('title','Link Copied')
           .tooltip('show')
           .attr('title','Copy link to clipboard')
           
});

