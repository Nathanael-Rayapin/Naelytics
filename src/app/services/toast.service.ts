import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type ToastSeverity = 'info' | 'warn' | 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class ToastService {
    private messageService = inject(MessageService);

    private readonly TOAST_KEY = 'bottom-right';
    private readonly DEFAULT_LIFE = 3000;

    show(severity: ToastSeverity, summary: string, detail?: string, life?: number, key?: string) {
        this.messageService.add({
            severity,
            summary,
            detail,
            key: key ?? this.TOAST_KEY,
            life: life ?? this.DEFAULT_LIFE
        });
    }

    info(summary: string, detail?: string, life?: number, key?: string) {
        this.show('info', summary, detail, life, key);
    }

    warn(summary: string, detail?: string, life?: number, key?: string) {
        this.show('warn', summary, detail, life, key);
    }

    success(summary: string, detail?: string, life?: number, key?: string) {
        this.show('success', summary, detail, life, key);
    }

    error(summary: string, detail?: string, life?: number, key?: string) {
        this.show('error', summary, detail, life, key);
    }

    clear(key?: string) {
        this.messageService.clear(key ?? this.TOAST_KEY);
    }
}