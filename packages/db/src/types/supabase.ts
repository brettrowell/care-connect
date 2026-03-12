export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          entity_id: string | null
          id: string
          state: string | null
          zip: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          entity_id?: string | null
          id?: string
          state?: string | null
          zip?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          entity_id?: string | null
          id?: string
          state?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addresses_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_codes: {
        Row: {
          code: string
          code_system: string
          created_at: string | null
          description: string | null
          id: string
        }
        Insert: {
          code: string
          code_system: string
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Update: {
          code?: string
          code_system?: string
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Relationships: []
      }
      contact_methods: {
        Row: {
          created_at: string | null
          entity_id: string | null
          id: string
          method_type: string
          value: string
        }
        Insert: {
          created_at?: string | null
          entity_id?: string | null
          id?: string
          method_type: string
          value: string
        }
        Update: {
          created_at?: string | null
          entity_id?: string | null
          id?: string
          method_type?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_methods_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_methods_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnoses: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          diagnosis_text: string
          id: string
          notes: string | null
          onset_date: string | null
          patient_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          diagnosis_text: string
          id?: string
          notes?: string | null
          onset_date?: string | null
          patient_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          diagnosis_text?: string
          id?: string
          notes?: string | null
          onset_date?: string | null
          patient_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          document_type: string | null
          entity_id: string | null
          file_name: string | null
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          patient_id: string | null
          source_id: string | null
          source_table: string | null
          title: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          document_type?: string | null
          entity_id?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          patient_id?: string | null
          source_id?: string | null
          source_table?: string | null
          title?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          document_type?: string | null
          entity_id?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          patient_id?: string | null
          source_id?: string | null
          source_table?: string | null
          title?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_patient_fk"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      entities: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          entity_type: string
          entity_type_id: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          entity_type: string
          entity_type_id?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          entity_type?: string
          entity_type_id?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entities_type_fk"
            columns: ["entity_type_id"]
            isOneToOne: false
            referencedRelation: "entity_types"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_attributes: {
        Row: {
          attribute_name: string
          attribute_value: string | null
          created_at: string | null
          entity_id: string
          id: string
        }
        Insert: {
          attribute_name: string
          attribute_value?: string | null
          created_at?: string | null
          entity_id: string
          id?: string
        }
        Update: {
          attribute_name?: string
          attribute_value?: string | null
          created_at?: string | null
          entity_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_attributes_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_attributes_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_relationships: {
        Row: {
          created_at: string | null
          entity_id: string
          id: string
          related_entity_id: string
          relationship_type: string
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          id?: string
          related_entity_id: string
          relationship_type: string
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          id?: string
          related_entity_id?: string
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_relationships_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relationships_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relationships_related_fk"
            columns: ["related_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entity_relationships_related_fk"
            columns: ["related_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_tags: {
        Row: {
          created_at: string | null
          entity_id: string
          id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          id?: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entity_tags_tag_fk"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_types: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      event_codes: {
        Row: {
          clinical_code_id: string
          id: string
          patient_event_id: string
        }
        Insert: {
          clinical_code_id: string
          id?: string
          patient_event_id: string
        }
        Update: {
          clinical_code_id?: string
          id?: string
          patient_event_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_codes_clinical_code_id_fkey"
            columns: ["clinical_code_id"]
            isOneToOne: false
            referencedRelation: "clinical_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_codes_patient_event_id_fkey"
            columns: ["patient_event_id"]
            isOneToOne: false
            referencedRelation: "patient_events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_participants: {
        Row: {
          created_at: string | null
          entity_id: string
          id: string
          patient_event_id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          id?: string
          patient_event_id: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          id?: string
          patient_event_id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_patient_event_id_fkey"
            columns: ["patient_event_id"]
            isOneToOne: false
            referencedRelation: "patient_events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_types: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      family_supports: {
        Row: {
          address_id: string | null
          created_at: string | null
          id: string
          organization_entity_id: string | null
          patient_id: string
          support_type: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address_id?: string | null
          created_at?: string | null
          id?: string
          organization_entity_id?: string | null
          patient_id: string
          support_type: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address_id?: string | null
          created_at?: string | null
          id?: string
          organization_entity_id?: string | null
          patient_id?: string
          support_type?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_supports_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_supports_org_fk"
            columns: ["organization_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_supports_org_fk"
            columns: ["organization_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_supports_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          role: string
          user_id: string
        }
        Update: {
          group_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          owner_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          owner_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          owner_id?: string | null
        }
        Relationships: []
      }
      insurances: {
        Row: {
          active_end_date: string | null
          active_start_date: string
          created_at: string | null
          deductible_amount: number | null
          group_number: string | null
          id: string
          insurance_type: string
          organization_id: string | null
          patient_id: string
          phone_number: string | null
          policy_holder_contact_id: string | null
          policy_holder_person_id: string | null
          policy_number: string
          updated_at: string | null
        }
        Insert: {
          active_end_date?: string | null
          active_start_date: string
          created_at?: string | null
          deductible_amount?: number | null
          group_number?: string | null
          id?: string
          insurance_type: string
          organization_id?: string | null
          patient_id: string
          phone_number?: string | null
          policy_holder_contact_id?: string | null
          policy_holder_person_id?: string | null
          policy_number: string
          updated_at?: string | null
        }
        Update: {
          active_end_date?: string | null
          active_start_date?: string
          created_at?: string | null
          deductible_amount?: number | null
          group_number?: string | null
          id?: string
          insurance_type?: string
          organization_id?: string | null
          patient_id?: string
          phone_number?: string | null
          policy_holder_contact_id?: string | null
          policy_holder_person_id?: string | null
          policy_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurances_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_expenses: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          expense_date: string
          id: string
          paid_by: string | null
          patient_id: string
          provider_entity_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          expense_date: string
          id?: string
          paid_by?: string | null
          patient_id: string
          provider_entity_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          expense_date?: string
          id?: string
          paid_by?: string | null
          patient_id?: string
          provider_entity_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_expenses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_expenses_provider_entity_id_fkey"
            columns: ["provider_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_expenses_provider_entity_id_fkey"
            columns: ["provider_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      note_attachments: {
        Row: {
          file_name: string | null
          file_url: string
          id: string
          mime_type: string | null
          note_id: string
          uploaded_at: string | null
        }
        Insert: {
          file_name?: string | null
          file_url: string
          id?: string
          mime_type?: string | null
          note_id: string
          uploaded_at?: string | null
        }
        Update: {
          file_name?: string | null
          file_url?: string
          id?: string
          mime_type?: string | null
          note_id?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "note_attachments_note_fk"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          entity_id: string | null
          id: string
          note: string
          patient_id: string | null
          source_id: string | null
          source_table: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          entity_id?: string | null
          id?: string
          note: string
          patient_id?: string | null
          source_id?: string | null
          source_table?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          entity_id?: string | null
          id?: string
          note?: string
          patient_id?: string | null
          source_id?: string | null
          source_table?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_patient_fk"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_answers: {
        Row: {
          answer_boolean: boolean | null
          answer_text: string | null
          created_at: string | null
          custom_question_text: string | null
          id: string
          patient_id: string
          question_id: string | null
          question_type: string
          updated_at: string | null
        }
        Insert: {
          answer_boolean?: boolean | null
          answer_text?: string | null
          created_at?: string | null
          custom_question_text?: string | null
          id?: string
          patient_id: string
          question_id?: string | null
          question_type: string
          updated_at?: string | null
        }
        Update: {
          answer_boolean?: boolean | null
          answer_text?: string | null
          created_at?: string | null
          custom_question_text?: string | null
          id?: string
          patient_id?: string
          question_id?: string | null
          question_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_answers_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          example_notes: string | null
          id: string
          next_appointment_date: string | null
          patient_id: string
          physician_entity_id: string | null
          provider_entity_id: string | null
          questions_to_ask: string | null
          reason_for_visit: string | null
          status: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          example_notes?: string | null
          id?: string
          next_appointment_date?: string | null
          patient_id: string
          physician_entity_id?: string | null
          provider_entity_id?: string | null
          questions_to_ask?: string | null
          reason_for_visit?: string | null
          status?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          example_notes?: string | null
          id?: string
          next_appointment_date?: string | null
          patient_id?: string
          physician_entity_id?: string | null
          provider_entity_id?: string | null
          questions_to_ask?: string | null
          reason_for_visit?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_appointments_physician_entity_id_fkey"
            columns: ["physician_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_appointments_physician_entity_id_fkey"
            columns: ["physician_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_appointments_provider_entity_id_fkey"
            columns: ["provider_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_appointments_provider_entity_id_fkey"
            columns: ["provider_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_care_team: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          patient_id: string | null
          provider_entity_id: string | null
          role_category: string | null
          start_date: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          patient_id?: string | null
          provider_entity_id?: string | null
          role_category?: string | null
          start_date?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          patient_id?: string | null
          provider_entity_id?: string | null
          role_category?: string | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_care_team_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_care_team_provider_fk"
            columns: ["provider_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_care_team_provider_fk"
            columns: ["provider_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_equipment: {
        Row: {
          created_at: string | null
          date_prescribed: string | null
          date_received: string
          deleted_at: string | null
          description: string | null
          id: string
          maintenance_due_date: string | null
          manufacturer: string | null
          model_number: string | null
          name: string
          notes: string | null
          patient_id: string
          prescribed_by_id: string | null
          reason_prescribed: string
          serial_number: string | null
          size: string | null
          status: Database["public"]["Enums"]["equipment_status"] | null
          supplier_id: string | null
          updated_at: string | null
          warranty_expiration: string | null
        }
        Insert: {
          created_at?: string | null
          date_prescribed?: string | null
          date_received: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          maintenance_due_date?: string | null
          manufacturer?: string | null
          model_number?: string | null
          name: string
          notes?: string | null
          patient_id: string
          prescribed_by_id?: string | null
          reason_prescribed: string
          serial_number?: string | null
          size?: string | null
          status?: Database["public"]["Enums"]["equipment_status"] | null
          supplier_id?: string | null
          updated_at?: string | null
          warranty_expiration?: string | null
        }
        Update: {
          created_at?: string | null
          date_prescribed?: string | null
          date_received?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          maintenance_due_date?: string | null
          manufacturer?: string | null
          model_number?: string | null
          name?: string
          notes?: string | null
          patient_id?: string
          prescribed_by_id?: string | null
          reason_prescribed?: string
          serial_number?: string | null
          size?: string | null
          status?: Database["public"]["Enums"]["equipment_status"] | null
          supplier_id?: string | null
          updated_at?: string | null
          warranty_expiration?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_equipment_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_events: {
        Row: {
          created_at: string | null
          date_from: string | null
          date_to: string | null
          deleted_at: string | null
          description: string | null
          duration_minutes: number | null
          event_date: string | null
          event_type_id: string | null
          id: string
          location: string | null
          notes: string | null
          organization_entity_id: string | null
          outcome: string | null
          patient_id: string
          physician_entity_id: string | null
          reason: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          date_from?: string | null
          date_to?: string | null
          deleted_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          event_date?: string | null
          event_type_id?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          organization_entity_id?: string | null
          outcome?: string | null
          patient_id: string
          physician_entity_id?: string | null
          reason?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          date_from?: string | null
          date_to?: string | null
          deleted_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          event_date?: string | null
          event_type_id?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          organization_entity_id?: string | null
          outcome?: string | null
          patient_id?: string
          physician_entity_id?: string | null
          reason?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_events_org_fk"
            columns: ["organization_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_events_org_fk"
            columns: ["organization_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_events_patient_fk"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_events_physician_fk"
            columns: ["physician_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_events_physician_fk"
            columns: ["physician_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_growth: {
        Row: {
          checked_by_entity_id: string | null
          created_at: string | null
          head_circumference: number | null
          height: number | null
          id: string
          notes: string | null
          patient_id: string
          recorded_date: string
          weight: number | null
        }
        Insert: {
          checked_by_entity_id?: string | null
          created_at?: string | null
          head_circumference?: number | null
          height?: number | null
          id?: string
          notes?: string | null
          patient_id: string
          recorded_date: string
          weight?: number | null
        }
        Update: {
          checked_by_entity_id?: string | null
          created_at?: string | null
          head_circumference?: number | null
          height?: number | null
          id?: string
          notes?: string | null
          patient_id?: string
          recorded_date?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_growth_checked_by_entity_id_fkey"
            columns: ["checked_by_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_growth_checked_by_entity_id_fkey"
            columns: ["checked_by_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_growth_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_nutrition: {
        Row: {
          amount: string | null
          created_at: string | null
          created_by: string | null
          date: string
          feeding_method: string | null
          food_item: string
          id: string
          notes: string | null
          patient_id: string
        }
        Insert: {
          amount?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          feeding_method?: string | null
          food_item: string
          id?: string
          notes?: string | null
          patient_id: string
        }
        Update: {
          amount?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          feeding_method?: string | null
          food_item?: string
          id?: string
          notes?: string | null
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_nutrition_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_profile_items: {
        Row: {
          category: string
          created_at: string | null
          id: string
          patient_id: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          patient_id?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          patient_id?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_profile_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_profiles: {
        Row: {
          created_at: string | null
          custom_sections: Json | null
          id: string
          introduction_text: string | null
          patient_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_sections?: Json | null
          id?: string
          introduction_text?: string | null
          patient_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_sections?: Json | null
          id?: string
          introduction_text?: string | null
          patient_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_profiles_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: true
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_supplies: {
        Row: {
          comments: string | null
          created_at: string | null
          date_ordered: string
          date_received: string | null
          deleted_at: string | null
          description: string | null
          id: string
          item_number: string | null
          name: string
          organization_id: string | null
          patient_id: string
          quantity: number
          quantity_back_ordered: number | null
          schedule: string | null
          status: Database["public"]["Enums"]["supply_status"] | null
          updated_at: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          date_ordered: string
          date_received?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          item_number?: string | null
          name: string
          organization_id?: string | null
          patient_id: string
          quantity: number
          quantity_back_ordered?: number | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["supply_status"] | null
          updated_at?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          date_ordered?: string
          date_received?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          item_number?: string | null
          name?: string
          organization_id?: string | null
          patient_id?: string
          quantity?: number
          quantity_back_ordered?: number | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["supply_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_supplies_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_tests: {
        Row: {
          comments: string | null
          created_at: string | null
          description: string | null
          id: string
          location_entity_id: string | null
          ordered_by_entity_id: string | null
          ordered_date: string | null
          patient_id: string
          results: string | null
          test_date: string | null
          test_type: string
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_entity_id?: string | null
          ordered_by_entity_id?: string | null
          ordered_date?: string | null
          patient_id: string
          results?: string | null
          test_date?: string | null
          test_type: string
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_entity_id?: string | null
          ordered_by_entity_id?: string | null
          ordered_date?: string | null
          patient_id?: string
          results?: string | null
          test_date?: string | null
          test_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_tests_location_entity_id_fkey"
            columns: ["location_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_tests_location_entity_id_fkey"
            columns: ["location_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_tests_ordered_by_entity_id_fkey"
            columns: ["ordered_by_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_tests_ordered_by_entity_id_fkey"
            columns: ["ordered_by_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_tests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_timeline: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string
          id: string
          patient_id: string
          source_id: string
          source_table: string
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date: string
          id?: string
          patient_id: string
          source_id: string
          source_table: string
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string
          id?: string
          patient_id?: string
          source_id?: string
          source_table?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_timeline_patient_fk"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address_id: string | null
          blood_type: string | null
          created_at: string | null
          date_of_birth: string | null
          group_id: string
          id: string
          interpreter_needed: boolean | null
          language: string | null
          patient_type: string | null
          person_id: string | null
          ssn_last4: string | null
          user_id: string | null
        }
        Insert: {
          address_id?: string | null
          blood_type?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          group_id: string
          id?: string
          interpreter_needed?: boolean | null
          language?: string | null
          patient_type?: string | null
          person_id?: string | null
          ssn_last4?: string | null
          user_id?: string | null
        }
        Update: {
          address_id?: string | null
          blood_type?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          group_id?: string
          id?: string
          interpreter_needed?: boolean | null
          language?: string | null
          patient_type?: string | null
          person_id?: string | null
          ssn_last4?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: true
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          active: boolean
          created_at: string | null
          deleted_at: string | null
          dosage: string
          duration: string | null
          end_date: string | null
          frequency: string
          id: string
          instructions: string | null
          medication: string
          notes: string | null
          patient_id: string
          pharmacy_entity_id: string | null
          pharmacy_notes: string | null
          possible_side_effects: string | null
          prescribed_date: string | null
          prescribing_entity_id: string | null
          prescribing_physician_id: string | null
          reason: string | null
          route: string | null
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          deleted_at?: string | null
          dosage: string
          duration?: string | null
          end_date?: string | null
          frequency: string
          id?: string
          instructions?: string | null
          medication: string
          notes?: string | null
          patient_id: string
          pharmacy_entity_id?: string | null
          pharmacy_notes?: string | null
          possible_side_effects?: string | null
          prescribed_date?: string | null
          prescribing_entity_id?: string | null
          prescribing_physician_id?: string | null
          reason?: string | null
          route?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          deleted_at?: string | null
          dosage?: string
          duration?: string | null
          end_date?: string | null
          frequency?: string
          id?: string
          instructions?: string | null
          medication?: string
          notes?: string | null
          patient_id?: string
          pharmacy_entity_id?: string | null
          pharmacy_notes?: string | null
          possible_side_effects?: string | null
          prescribed_date?: string | null
          prescribing_entity_id?: string | null
          prescribing_physician_id?: string | null
          reason?: string | null
          route?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_entity_fk"
            columns: ["prescribing_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_entity_fk"
            columns: ["prescribing_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_pharmacy_entity_fk"
            columns: ["pharmacy_entity_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_pharmacy_entity_fk"
            columns: ["pharmacy_entity_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_physician_entity_fk"
            columns: ["prescribing_physician_id"]
            isOneToOne: false
            referencedRelation: "entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_physician_entity_fk"
            columns: ["prescribing_physician_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string | null
          id: string
          question_text: string
          question_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_text: string
          question_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question_text?: string
          question_type?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      pharmacies: {
        Row: {
          address_line1: string | null
          city: string | null
          id: string | null
          name: string | null
          phone: string | null
          state: string | null
          zip: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      deactivate_prescription: { Args: { pres_id: string }; Returns: undefined }
    }
    Enums: {
      equipment_status:
        | "active"
        | "inactive"
        | "repaired"
        | "returned"
        | "lost"
        | "replaced"
        | "retired"
      event_status: "scheduled" | "completed" | "cancelled" | "legacy_label"
      relationship_type_enum:
        | "patient"
        | "father"
        | "mother"
        | "sibling"
        | "spouse"
        | "emergency_contact"
        | "guardian"
        | "grandparent"
        | "aunt_uncle"
        | "cousin"
        | "friend"
        | "other"
      supply_status:
        | "pending"
        | "ordered"
        | "received"
        | "back_ordered"
        | "discontinued"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      equipment_status: [
        "active",
        "inactive",
        "repaired",
        "returned",
        "lost",
        "replaced",
        "retired",
      ],
      event_status: ["scheduled", "completed", "cancelled", "legacy_label"],
      relationship_type_enum: [
        "patient",
        "father",
        "mother",
        "sibling",
        "spouse",
        "emergency_contact",
        "guardian",
        "grandparent",
        "aunt_uncle",
        "cousin",
        "friend",
        "other",
      ],
      supply_status: [
        "pending",
        "ordered",
        "received",
        "back_ordered",
        "discontinued",
      ],
    },
  },
} as const
