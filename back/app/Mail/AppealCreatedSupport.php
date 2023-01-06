<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;


class AppealCreatedSupport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The order instance.
     *
     * @var \App\Models\Appeal
     */
    public $appeal;
    /**
     * Create a new message instance.
     * @param  \App\Models\Appeal  $appeal
     * @return void
     */
    public function __construct($appeal)
    {
        $this->appeal = $appeal;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Поступило новое сообщение',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.supportappeal',
            with: [
                'status' => $this->appeal->status->name,
                'authorEmail' => $this->appeal->user_email,
                'authorName' => $this->appeal->user_name,
                'theme' => $this->appeal->theme,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
