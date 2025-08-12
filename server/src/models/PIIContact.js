import mongoose from 'mongoose';

// Store PII separately; values are stored encrypted at rest.
const PIIContactSchema = new mongoose.Schema(
    {
        // hashed link to conversation to avoid direct joins on plain UUID
        conversationUuidHash: { type: String, index: true },

        firstNameEnc: { type: String, default: '' },
        lastNameEnc: { type: String, default: '' },
        emailEnc: { type: String, default: '' },
        phoneEnc: { type: String, default: '' },

        // explicit consent flags and timestamps for GDPR accountability
        consentGiven: { type: Boolean, default: false },
        consentScope: { type: [String], default: [] },
        consentTimestamp: { type: Date },
        retentionUntil: { type: Date },
    },
    { timestamps: true }
);

// TTL index to auto-delete PII after retentionUntil passes
PIIContactSchema.index({ retentionUntil: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('PIIContact', PIIContactSchema);


