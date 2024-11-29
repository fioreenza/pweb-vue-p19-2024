<template>
  <div>
    <h1>Create a New Book</h1>
    <form @submit.prevent="createBook">
      <div>
        <label for="title">Title:</label>
        <input v-model="newBook.title" id="title" type="text" required />
      </div>
      <div>
        <label for="author">Author:</label>
        <input v-model="newBook.author" id="author" type="text" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <input v-model="newBook.category" id="category" type="text" required />
      </div>
      <div>
        <label for="status">Status:</label>
        <select v-model="newBook.status" id="status" required>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>
      <button type="submit" class="submit-button">Add Book</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Book {
  title: string
  author: string
  category: string
  status: string
}

export default defineComponent({
  name: 'CreateBook',
  setup() {
    const newBook = ref<Book>({
      title: '',
      author: '',
      category: '',
      status: 'Available'
    })

    const createBook = async () => {
      try {
        const response = await fetch('https://pweb-express-mongodb-p19-2024.vercel.app/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBook.value)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to create book')
        }

        alert('Book created successfully!')
        // Reset form fields
        newBook.value = {
          title: '',
          author: '',
          category: '',
          status: 'Available'
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert('Error creating book: ' + error.message)
        } else {
          alert('An unexpected error occurred')
        }
      }
    }

    return {
      newBook,
      createBook
    }
  }
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, select {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.submit-button {
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: darkgreen;
}
</style>
