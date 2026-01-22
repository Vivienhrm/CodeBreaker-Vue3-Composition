import { ref } from 'vue'

export function useGame() {
    const code = ref([])
    const attempts = ref([])
    const state = ref('playing') // 'playing', 'won', 'lost'
    const maxAttempts = 10

    const generateCode = () => {
        const digits = []
        while (digits.length < 4) {
            const randomDigit = Math.floor(Math.random() * 10)
            if (!digits.includes(randomDigit)) {
                digits.push(randomDigit)
            }
        }
        code.value = digits
        attempts.value = []
        state.value = 'playing'
    }

    const validateAttempt = (userAttempt) => {
        if (state.value !== 'playing') return

        let wellPlaced = 0
        let misplaced = 0

        // Clone for comparison
        const target = [...code.value]
        const guess = [...userAttempt]

        for (let i = 0; i < target.length; i++) {
            if (guess[i] === target[i]) {
                wellPlaced++
            } else if (target.includes(guess[i])) {
                misplaced++
            }
        }

        const result = {
            guess: [...userAttempt],
            wellPlaced,
            misplaced
        }

        attempts.value.push(result)

        if (wellPlaced === target.length) {
            state.value = 'won'
        } else if (attempts.value.length >= maxAttempts) {
            state.value = 'lost'
        }

        return result
    }

    return {
        code,
        attempts,
        state,
        generateCode,
        validateAttempt
    }
}
