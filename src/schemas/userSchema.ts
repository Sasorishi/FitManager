import { z } from "zod";

// Schéma de validation pour la table enrichie `users`
export const userSchema = z.object({
  id: z.string().uuid(), // UUID unique
  email: z.string().email(), // Email valide
  display_name: z.string().min(1), // Nom d'affichage obligatoire
  role: z.string().default("athlete"), // Rôle utilisateur
  calorie_goal: z.number().min(1000).max(6000).default(2000), // Objectif calorique
  plan_type: z.string().optional(), // Type de programme (optionnel)
  created_at: z.date().default(new Date()), // Date de création
});

// Validation des données utilisateur
export const validateUser = (data: unknown) => {
  return userSchema.safeParse(data);
};
