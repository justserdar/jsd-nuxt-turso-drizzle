<script lang="ts" setup>
const errorMessage = ref<string | null>(null);

export interface Ticket {
  name: string,
  email: string,
  subject: string,
  description: string,

}

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  errorMessage.value = null;
  const formData = new FormData(e.target);
  try {
    await $fetch("/api/v1/resources/tickets/create", {
      method: "POST",
      body: <Ticket>{
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        description: formData.get("description"),
      }
    });

  } catch (e) {
    const { data: error } = e as {
      data: {
        message: string;
      };
    };
    errorMessage.value = error.message;
  }
};
</script>

<template>

  <section class="m-auto px-6 mt-10">
    <div class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <div class="flex justify-between">
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Create Ticket</h2>
        <NuxtLink to="/app/tickets"
          class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          View all Tickets
        </NuxtLink>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="w-full grid grid-cols-2 gap-6 mt-4">
          <div class="col-span-2 md:col-span-1">
            <label class="text-gray-700 dark:text-gray-200" for="username">Name</label>
            <input id="username" type="text" name="name"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
          </div>

          <div class="col-span-2 md:col-span-1">
            <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
            <input id="emailAddress" type="email" name="email"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
          </div>

          <div class="col-span-2">
            <label class="text-gray-700 dark:text-gray-200" for="subject">Subject</label>
            <input id="subject" type="text" name="subject"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
          </div>

          <div class="col-span-2">
            <label class="text-gray-700 dark:text-gray-200" for="description">Description</label>
            <textarea id="description" type="description" name="description"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
          </div>

          <div>
            <p class="error">{{ errorMessage }}</p>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
      </form>
      <a href="https://merakiui.com/components/application-ui/forms">Component from Meraki UI, check their awesome
        components. </a>
    </div>
  </section>
</template>