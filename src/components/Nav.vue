<template>
    <v-bottom-navigation
>
    <!-- <routerLink to="/about-us" style="text-decoration: none;">
    <v-btn value="recent" style="padding-bottom: 10px;">
      <v-icon>mdi-history</v-icon>
      О нас
    </v-btn>
    </routerLink> -->
    
    <routerLink to="/diary" style="text-decoration: none;">
    <v-btn value="favorites" style="padding-bottom: 10px;">
      <v-icon>mdi-notebook</v-icon>
      Мои заметки
    </v-btn>
    </routerLink>
    <routerLink to="/calendar" style="text-decoration: none;">
    <v-btn value="nearby" style="padding-bottom: 10px; ">
      <v-icon>mdi-calendar-account-outline</v-icon>
      Календарь
    </v-btn>
  </routerLink>
</v-bottom-navigation>
</template>