$("#postTextAreaContainer").keyup(event => {
    var textbox = $(event.target);
    var value = textbox.val().trim();

    var submitButton = $("#submitButton");

    if (submitButton.length == 0) return alert("No submit button found");

    if (value == "") {
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);
})


$("#submitButton").click(() => {
    var button = $(event.target);
    var textbox = $("#postTextAreaContainer");

    var data = {
        content: textbox.val()
    }

    $.post("/api/post", data, (postData, status, xhr) => {
        var html = appendinPost(postData);
        $('.postContainer').prepend(html);
        textbox.val("");
        button.prop("disabled", true);
    })
})

$(document).on("click", ".likeBtn", () => {
    var btn = $(event.target);
    var postId = getPostIdElement(btn);


    if(postId ==undefined) return;

    $.ajax({
        url: '/api/post' ,
        type: 'PUT',
        success: (postData) => {
            console.log(postData)
        }
    })
})



function getPostIdElement(element){
    var root = element.hasClass('post');
    var rootElement = root ? element : element.closest('.post');
    var postId = rootElement.data().id;
    if (postId == undefined){
        alert('post if undefind')
    }
    return postId;
}


function appendinPost(postData) {
    const postBy = postData.postBy
    const name = `${postBy.firstName} ${postBy.lastName} `;
    const timeStamp = timeDifference(new Date(), new Date(postBy.createdAt))
    return `<div class='post' data-id='${postData._id}'>
                <div class='postMainContainer'>
                    <div class='userImageContainer'>
                        <img src='${postBy.profilePic}'>
                    </div>
                </div>
                <div class='postContentContainer'>
                    <div class='header'>
                        <a class='full-name' href='/profile/${postBy._id}'>${name}</a>
                        <span class='username'>@${postBy.username}</span>
                        <span class='timeStamp'>${timeStamp}</span>
                    </div>
                    <div class='content'>
                        <span>${postData.content}</span>
                    </div>
                    <div class='postFooter'>
                        <div class="postButtonContainer">
                            <button class='likeBtn'>
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                        <div class="postButtonContainer">
                            <button>
                                <i class="fas fa-retweet"></i>
                            </button>
                        </div>
                        <div class="postButtonContainer">
                            <button>
                              <i class="fas fa-comments"></i>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>`
}


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (elapsed/1000 < 30){
            return 'just now'
        }
        return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}
