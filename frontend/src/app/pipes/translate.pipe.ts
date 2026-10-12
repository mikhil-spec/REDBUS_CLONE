import {
  Pipe,
  PipeTransform,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";

import {
  TranslationService
} from "../service/translation.service";

import {
  Subscription
} from "rxjs";

@Pipe({
  name: "translate",
  pure: false
})
export class TranslatePipe
  implements PipeTransform, OnDestroy {

  private currentLanguage = "";

  private lastKey = "";

  private lastVariablesKey = "";

  private lastOutput = "";

  private langSub!: Subscription;

  constructor(
    private translationService:
      TranslationService,

    private cdr:
      ChangeDetectorRef
  ) {
    this.currentLanguage =
      this.translationService
        .getCurrentLanguage();

    this.langSub =
      this.translationService
        .currentLang$
        .subscribe(
          newLang => {
            if (
              newLang !==
              this.currentLanguage
            ) {
              this.currentLanguage =
                newLang;

              this.lastKey = "";

              this.lastVariablesKey =
                "";

              this.lastOutput =
                "";

              this.cdr.markForCheck();
            }
          }
        );
  }

  transform(
    key: string,
    variables:
      Record<
        string,
        string | number
      > = {}
  ): string {

    if (!key) {
      return "";
    }

    const variablesKey =
      JSON.stringify(
        variables
      );

    if (
      key === this.lastKey &&
      variablesKey ===
        this.lastVariablesKey &&
      this.lastOutput
    ) {
      return this.lastOutput;
    }

    this.lastKey = key;

    this.lastVariablesKey =
      variablesKey;

    this.lastOutput =
      this.translationService.translate(
        key,
        variables
      );

    return this.lastOutput;
  }

  ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}