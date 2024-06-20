import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayMusicPage } from './play-music.page';

describe('PlayMusicPage', () => {
  let component: PlayMusicPage;
  let fixture: ComponentFixture<PlayMusicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
