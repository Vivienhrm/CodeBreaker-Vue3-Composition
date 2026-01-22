<template>
  <div class="code-field">
    <div class="inputs">
      <input 
        v-for="n in length" 
        :key="n"
        :ref="el => inputRefs[n-1] = el"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        v-model="digits[n-1]"
        @input="onInput($event, n-1)"
        @keydown.delete="onDelete($event, n-1)"
        class="digit-input"
        placeholder=""
      />
    </div>
    <button 
      @click="handleValidate" 
      class="validate-btn" 
      :disabled="!isComplete"
    >
      Valider
    </button>
  </div>
</template>

<script setup>
import { computed, watch, ref, onBeforeUpdate } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'validate'])

const digits = ref([...props.modelValue])
const inputRefs = ref([])

onBeforeUpdate(() => {
  inputRefs.value = []
})

const isComplete = computed(() => {
  return digits.value.length === props.length && 
         digits.value.every(d => d !== '' && d !== null && d !== undefined)
})

const onInput = (event, index) => {
  const val = event.target.value
  
  // Only keep the last digit if multiple were entered
  if (val.length > 1) {
    digits.value[index] = val.charAt(val.length - 1)
  }

  // Ensure it's a digit
  if (!/^\d$/.test(digits.value[index])) {
    digits.value[index] = ''
    return
  }

  updateValue()

  // Auto advance
  if (digits.value[index] !== '' && index < props.length - 1) {
    inputRefs.value[index + 1].focus()
  }
}

const onDelete = (event, index) => {
  if (digits.value[index] === '' && index > 0) {
    inputRefs.value[index - 1].focus()
  }
}

const updateValue = () => {
  emit('update:modelValue', [...digits.value])
}

const handleValidate = () => {
  if (isComplete.value) {
    emit('validate')
    // Reset after validation
    digits.value = Array(props.length).fill('')
    updateValue()
    inputRefs.value[0].focus()
  }
}

// Watch for external changes (e.g. reset)
watch(() => props.modelValue, (newVal) => {
  // Only update if external value is different (avoids loops)
  if (JSON.stringify(newVal) !== JSON.stringify(digits.value)) {
    digits.value = [...newVal]
  }
}, { deep: true })
</script>

<style scoped>
.code-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.inputs {
  display: flex;
  gap: 10px;
}

.digit-input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid #444;
  background: #333;
  color: white;
  margin: 0;
}

.digit-input::-webkit-outer-spin-button,
.digit-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.digit-input:focus {
  border-color: #42b883;
  outline: none;
}

.validate-btn {
  width: 100%;
  max-width: 230px;
}
</style>
