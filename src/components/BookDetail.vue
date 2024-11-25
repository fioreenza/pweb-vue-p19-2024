<template>
    <div v-if="book" class="book-detail">
      <div class="container mx-auto px-4 py-8 flex flex-col justify-center items-center md:flex-row md:items-start">
        <!-- Cover Image -->
        <div class="w-[70%] sm:w-[60%] md:w-[35%] lg:w-[25%] flex items-center justify-center mb-6 md:mb-0">
          <img :src="book.coverImage" :alt="`Cover of ${book.title}`" class="w-full max-w-sm rounded-lg shadow-lg" />
        </div>
        <!-- Book Details -->
        <div class="md:w-1/2 lg:w-[35%] sm:w-[60%] w-[70%] md:pl-8">
          <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2">{{ book.title }}</h2>
          <p class="text-sm md:text-lg text-gray-600 font-medium mb-4">by {{ book.author }}</p>
          <div class="flex items-center text-sm md:text-md text-gray-500 space-x-4 mb-6">
            <p>Rating: <span class="font-semibold text-gray-700">{{ book.rating.average }}</span></p>
            <p>Reviews: <span class="font-semibold text-gray-700">{{ book.rating.count }}</span></p>
          </div>
          <p class="text-gray-700 mb-4">{{ book.description }}</p>
          <p class="text-sm text-gray-600 mb-4">
            Published by <span class="font-semibold text-gray-800">{{ book.publisher }}</span> on
            <span class="font-semibold text-gray-800">{{ formatDate(book.publishedDate) }}</span>
          </p>
          <!-- Tags -->
          <div class="flex flex-wrap mb-4">
            <span
              v-for="tag in book.tags"
              :key="tag"
              class="px-3 py-1 mr-2 mb-2 bg-blue-100 text-blue-600 rounded-full text-xs hover:bg-blue-200 cursor-pointer"
            >
              {{ tag }}
            </span>
          </div>
          <!-- Stock and Back Button -->
          <div class="flex justify-between items-center mt-6">
            <p class="text-sm md:text-md text-gray-600">
              Stock: <span class="font-semibold text-gray-800">{{ book.qty }}</span>
            </p>
            <router-link
              :to="{ name: 'books' }"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Back to List
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 text-lg font-semibold">{{ error }}</p>
    </div>
    <!-- Loading State -->
    <div v-else class="text-center py-8">
      <p class="text-gray-600 text-lg">Loading...</p>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  interface Book {
    _id: string;
    coverImage: string;
    title: string;
    publishedDate: string;
    publisher: string;
    description: string;
    tags: string[];
    author: string;
    qty: number;
    rating: {
      count: number;
      average: number;
    };
  }
  
  export default {
    name: 'BookDetail',
    setup() {
      const route = useRoute();
      const book = ref<Book | null>(null);
      const error = ref<string | null>(null);
  
      onMounted(async () => {
        try {
          const response = await axios.get(
            `https://pweb-express-mongodb-p19-2024.vercel.app/book/${route.params.id}`
          );
          book.value = response.data.data;
        } catch (err) {
          console.error('Error fetching book details:', err);
          error.value = 'Failed to load book details';
        }
      });
  
      const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        return new Date(date).toLocaleDateString('en-US', options);
      };
  
      return {
        book,
        error,
        formatDate,
      };
    },
  };
  </script>

  