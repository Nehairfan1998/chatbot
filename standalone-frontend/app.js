class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }
        if(text1==="about" || text1==="About"){
            console.log("Redirect to About page")
            window.location = 'https://www.mpowerUrge.com/about'
            return;
        }
        if(text1==="find jobs" || text1==="Find jobs"){
            console.log("Redirect to find jobs")
            window.location = 'https://www.mpowerurge.com/joblist'
            return;
        }
        if(text1==="Training" || text1==="training"){
            console.log("Redirect to find jobs")
            window.location = 'https://www.mpowerurge.com/joblist'
            return;
        }
        if(text1==="Counselling" || text1==="counselling"){
            console.log("Redirect to counselling")
            window.location = 'https://www.mpowerurge.com/counselling'
            return;
        } 
        if(text1==="Webinar" || text1==="webinar"){
            console.log("Redirect to webinar")
            window.location = 'https://www.mpowerurge.com/counselling'
            return;
        }
        // if(text1==="Register" || text1==="register"){
        //     console.log("Redirect to webinar")
        //     window.location = 'https://www.mpowerurge.com/register'
        //     return;
        // }
        


        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            // window.location = 'https://www.google.com'
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();