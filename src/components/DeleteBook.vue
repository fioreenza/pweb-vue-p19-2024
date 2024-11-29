<template>
  <div v-if="book">
    <h1>{{ book.title }}</h1>
    <p>Author: {{ book.author }}</p>
    <p>Category: {{ book.category }}</p>
    <p>Status: {{ book.status }}</p>
    
    <!-- Button to delete the book -->
    <button @click="deleteBook(book.id)" class="delete-button">Delete Book</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteBook } from '@/services/bookService'

export default defineComponent({
  name: 'BookDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const book = ref<any>(null)

    // Fetch the book data by id
    const fetchBook = async () => {
      const bookId = route.params.id
      try {
        const response = await fetch(`https://your-api-url.com/books/${bookId}`)
        book.value = await response.json()
      } catch (error) {
        console.error('Error fetching book:', error)
      }
    }

    // Delete book function
    const deleteBookHandler = async (id: string) => {
      try {
        await deleteBook(id)
        // After deletion, redirect to book list page
        router.push('/')
      } catch (error) {
        alert('Error deleting book: ' + error.message)
      }
    }

    // On component mounted, fetch the book details
    onMounted(() => {
      fetchBook()
    })

    return {
      book,
      deleteBook: deleteBookHandler
    }
  }
})
</script>

<style scoped>
.delete-button {
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.delete-button:hover {
  background-color: darkred;
}
</style>
