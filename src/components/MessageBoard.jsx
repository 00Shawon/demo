'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function MessageBoard() {
  const [messages, setMessages] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    nameUrdu: '',
    message: '',
    messageUrdu: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(50)
      
      setMessages(data || [])
    } catch (err) {
      console.log('Messages fetch skipped - Supabase not configured')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: formData.name,
          name_urdu: formData.nameUrdu || null,
          message: formData.message,
          message_urdu: formData.messageUrdu || null,
          approved: false,
        }])

      if (!error) {
        setSubmitted(true)
        setFormData({ name: '', nameUrdu: '', message: '', messageUrdu: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Unable to submit message. Please try again.')
      }
    } catch (err) {
      setError('Unable to submit message. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <section className="py-32 bg-[#FCFCFB]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2B2B2B] tracking-tight mb-4">
            Leave Your Blessings
          </h2>
          <p className="font-arabic text-3xl text-[#2B2B2B]/70 direction-rtl">
            اپنی دعائیں چھوڑیں
          </p>
          
          <div className="h-[1px] w-16 bg-[#A67C52] mx-auto mt-8" />
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto mb-24">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name (English) */}
            <div>
              <label className="font-body text-sm text-[#2B2B2B]/70 uppercase tracking-wide mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                required
                maxLength={50}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-4 bg-[#FAF9F6] border border-[#E8E2DB] text-[#2B2B2B] font-body text-base focus:outline-none focus:border-[#A67C52] transition-colors duration-300"
                placeholder="John Doe"
              />
            </div>

            {/* Name (Urdu) - Optional */}
            <div>
              <label className="font-arabic text-sm text-[#2B2B2B]/70 mb-2 block direction-rtl">
                آپ کا نام (اختیاری)
              </label>
              <input
                type="text"
                maxLength={50}
                value={formData.nameUrdu}
                onChange={(e) => setFormData({...formData, nameUrdu: e.target.value})}
                className="w-full px-5 py-4 bg-[#FAF9F6] border border-[#E8E2DB] text-[#2B2B2B] font-arabic text-base text-right direction-rtl focus:outline-none focus:border-[#A67C52] transition-colors duration-300"
                placeholder="جان ڈو"
              />
            </div>

            {/* Message (English) */}
            <div>
              <label className="font-body text-sm text-[#2B2B2B]/70 uppercase tracking-wide mb-2 block">
                Your Message
              </label>
              <textarea
                required
                maxLength={300}
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-5 py-4 bg-[#FAF9F6] border border-[#E8E2DB] text-[#2B2B2B] font-body text-base resize-none focus:outline-none focus:border-[#A67C52] transition-colors duration-300"
                placeholder="May Allah bless your union..."
              />
              <p className="text-xs text-[#2B2B2B]/50 mt-2 text-right">
                {formData.message.length}/300
              </p>
            </div>

            {/* Message (Urdu) - Optional */}
            <div>
              <label className="font-arabic text-sm text-[#2B2B2B]/70 mb-2 block direction-rtl">
                آپ کا پیغام (اختیاری)
              </label>
              <textarea
                maxLength={300}
                rows={4}
                value={formData.messageUrdu}
                onChange={(e) => setFormData({...formData, messageUrdu: e.target.value})}
                className="w-full px-5 py-4 bg-[#FAF9F6] border border-[#E8E2DB] text-[#2B2B2B] font-arabic text-base text-right direction-rtl resize-none focus:outline-none focus:border-[#A67C52] transition-colors duration-300"
                placeholder="اللہ آپ کے اتحاد کو برکت دے..."
              />
              <p className="text-xs text-[#2B2B2B]/50 mt-2 direction-rtl">
                {formData.messageUrdu.length}/300
              </p>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-[#2B2B2B] text-[#FAF9F6] font-body text-sm uppercase tracking-wide hover:bg-[#A67C52] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Blessing'}
              </button>

              {submitted && (
                <p className="text-[#2D6A4F] font-body text-sm">
                  ✓ Thank you! Your message will appear after approval.
                </p>
              )}

              {error && (
                <p className="text-red-600 font-body text-sm">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Messages Grid */}
        {messages.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="break-inside-avoid bg-[#FAF9F6] border border-[#E8E2DB] p-6 hover:border-[#A67C52]/50 transition-colors duration-300"
              >
                <p className="font-body text-base text-[#2B2B2B]/80 leading-relaxed mb-4">
                  &ldquo;{msg.message}&rdquo;
                </p>

                {msg.message_urdu && (
                  <p className="font-arabic text-base text-[#2B2B2B]/60 leading-relaxed mb-4 direction-rtl">
                    &rdquo;{msg.message_urdu}&ldquo;
                  </p>
                )}

                <div className="h-[1px] bg-[#E8E2DB] my-4" />

                <p className="font-body text-sm text-[#A67C52] uppercase tracking-wide">
                  — {msg.name}
                </p>
                {msg.name_urdu && (
                  <p className="font-arabic text-sm text-[#A67C52]/70 direction-rtl mt-1">
                    — {msg.name_urdu}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
