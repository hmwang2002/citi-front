
<template>
    <div class="welcome-container">
        <div class="text-container">
            How can I help you today?
        </div>
        <div class="chat-container">
            <transition name="bubble-fade">
                <div v-if="showInitialBubbles" class="initial-bubbles">
                    <div v-for="(message, index) in initialMessages" :key="index" class="bubble">{{ message }}</div>
                </div>
            </transition>
            <div class="input-container">
                <input v-model="message"  placeholder="Type your message..." >
                <button @click="sendMessage">发送</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "rightWelcomeComponent",
    data() {
        return {
            showInitialBubbles: true,
            message: "",
            initialMessages: ["Hello!", "Ask me anything.", "I'm here to assist you.", "Feel free to chat."],
        };
    },
    methods: {
        sendMessage() {
            console.log("Message sent:", this.message);
            this.showInitialBubbles = false;
        },
    },
};
</script>

<style>
.welcome-container {
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.text-container {
    line-height: 450px;
    height: 50%;
    font-size: xx-large;
    color: rgb(155, 66, 255);
}

.chat-container {
    margin-bottom: 50px;
    width: 70%;
}

.initial-bubbles {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-column-gap: 2px;

}

.bubble {
    width: 48%;
    background-color: #fff;
    color: rgb(155, 66, 255);
    padding: 8px;
    margin: 5px;
    border-radius: 10px;
    border: 2px solid #EEE3FAFF;
}
.bubble-fade-enter-active, .bubble-fade-leave-active {
    transition: opacity 0.5s;
}

.bubble-fade-enter, .bubble-fade-leave-to {
    opacity: 0;
}


.input-container {
    display: flex;
    margin-top: 5px;
}

input {
    flex: 1;
    padding: 8px;
    height: 40px;
    border-radius: 8px;
    border: 2px solid #d3d3d3;

}

button {
    background-color:  rgb(155, 66, 255);
    color: #fff;
    padding: 8px;
    border: none;
    border-radius: 7px;
    margin-left: 5px;
    cursor: pointer;
}

</style>
