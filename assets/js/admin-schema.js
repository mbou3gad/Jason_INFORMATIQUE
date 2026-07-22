/**
 * JASON_INFORMATIQUE - Administration Readiness & CRUD Schema
 * Provides data structures and API adapters for future admin dashboard integration (Firebase / Supabase / REST API).
 */

const AdminSchema = {
  // Collection Schemas for future DB tables
  schemas: {
    services: {
      fields: ["id", "title", "category", "icon", "shortDesc", "fullDesc", "features", "popular", "active", "updatedAt"]
    },
    products: {
      fields: ["id", "name", "category", "price", "currency", "badge", "icon", "specs", "desc", "stock", "active"]
    },
    orders: {
      fields: ["id", "customerName", "email", "phone", "items", "totalAmount", "status", "paymentMethod", "createdAt"]
    },
    formations: {
      fields: ["id", "title", "level", "duration", "category", "icon", "desc", "price", "active"]
    },
    portfolio: {
      fields: ["id", "title", "category", "client", "image", "tags", "desc", "link", "createdAt"]
    },
    blog: {
      fields: ["id", "title", "slug", "category", "author", "content", "excerpt", "image", "publishedAt", "status"]
    },
    quotes: {
      fields: ["id", "clientName", "email", "phone", "serviceId", "budget", "message", "status", "createdAt"]
    },
    appointments: {
      fields: ["id", "clientName", "email", "phone", "date", "time", "topic", "status", "createdAt"]
    },
    aiLogs: {
      fields: ["id", "sessionId", "userPrompt", "botResponse", "intent", "providerUsed", "timestamp"]
    }
  },

  // Future API Adapter Interface Pattern
  APIAdapter: class {
    constructor(provider = "LOCAL_MOCK", endpoint = "") {
      this.provider = provider;
      this.endpoint = endpoint;
    }

    async getCollection(collectionName) {
      console.log(`[AdminSchema] Fetching collection: ${collectionName} via ${this.provider}`);
      if (JasonData[collectionName]) {
        return { success: true, data: JasonData[collectionName] };
      }
      return { success: false, error: "Collection not found" };
    }

    async createItem(collectionName, itemData) {
      console.log(`[AdminSchema] Creating item in ${collectionName}:`, itemData);
      return { success: true, id: `mock-${Date.now()}` };
    }

    async updateItem(collectionName, itemId, updatedData) {
      console.log(`[AdminSchema] Updating item ${itemId} in ${collectionName}:`, updatedData);
      return { success: true };
    }

    async deleteItem(collectionName, itemId) {
      console.log(`[AdminSchema] Deleting item ${itemId} from ${collectionName}`);
      return { success: true };
    }
  }
};

window.AdminSchema = AdminSchema;
